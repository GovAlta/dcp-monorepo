import { RequestHandler } from 'express';
import { DataCache } from '../../../cache/types';
import { TokenProvider } from '@abgov/adsp-service-sdk';
import { CacheConfigs, CacheKeys } from '../../../cache';
import { Logger } from 'winston';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { RoadmapCsvData } from '../types';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const VALUE_SERVICE_NAME_SPACE = 'common-capabilities';
const VALUE_SERVICE_LISTING_NAME = 'published-index';
const SERVICE_DEFINITION_ID = 'appId';
const SERVICE_LISTING_KEY = 'index';

function reqestErrorHandler(
  error: Error,
  logger: Logger,
  customMessage: string,
  res,
  status = 400
) {
  if (axios.isAxiosError(error)) {
    logger.error(error.response.data, customMessage);
    res.status(error.response.status).send(error.response.data);
  } else {
    logger.error(error.message, customMessage);
    res.status(status).send({ error: error });
  }
}

function mapServiceInfo(serviceInfo) {
  const services = serviceInfo.data?.[VALUE_SERVICE_NAME_SPACE] || {};
  const serviceId = Object.keys(services)[0];
  const serviceDetails = services?.[serviceId]?.[0]?.value;
  const lastUpdatedDate = services?.[serviceId]?.[0]?.timestamp;

  if (serviceDetails && Object.keys(serviceDetails).length > 0) {
    return {
      ...serviceDetails,
      lastUpdatedDate: lastUpdatedDate || serviceDetails.lastUpdatedDate,
    };
  } else {
    return undefined;
  }
}

async function axioGet(url: string, token: string) {
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
}

export async function fetchServices(
  valueServiceUrl: URL,
  token: string,
  cache: DataCache,
  logger: Logger
) {
  let result = {};
  const serviceListings = await axioGet(
    `${valueServiceUrl}/${VALUE_SERVICE_NAME_SPACE}/values/${VALUE_SERVICE_LISTING_NAME}?top=1`,
    token
  );
  const serviceIds =
    serviceListings?.data?.[VALUE_SERVICE_NAME_SPACE]?.[
      VALUE_SERVICE_LISTING_NAME
    ]?.[0]?.value?.[SERVICE_LISTING_KEY];

  logger.info(
    `listing names to be fetched listings=${JSON.stringify(serviceIds)}`
  );

  if (serviceIds) {
    const fetchServiceInfos = serviceIds.map((id: string) =>
      axioGet(
        `${valueServiceUrl}/${VALUE_SERVICE_NAME_SPACE}/values/${id}?top=1`,
        token
      )
    );

    await Promise.all(fetchServiceInfos).then(async (serviceInfos) => {
      result = serviceInfos.reduce((acc, serviceInfo) => {
        const serviceDefinition = mapServiceInfo(serviceInfo);

        if (serviceDefinition && serviceDefinition[SERVICE_DEFINITION_ID]) {
          acc[serviceDefinition[SERVICE_DEFINITION_ID]] = serviceDefinition;
        }

        return acc;
      }, {});

      await cache.set(CacheKeys.SERVICES, result, CacheConfigs[CacheKeys.SERVICES].ttl);

      logger.info(
        `services fetched from ADSP: keySize=${
          Object.keys(result).length
        }, valueSize=${Object.values(result).length}`
      );
    });
  }

  return result;
}

async function getAllServices(
  valueServiceUrl: URL,
  token: string,
  cache: DataCache,
  logger: Logger
) {
  let result = await cache.get(CacheKeys.SERVICES);

  if (!result) {
    result = await fetchServices(valueServiceUrl, token, cache, logger);
  }

  return result;
}

export function exportServicesRoadmap(
  logger: Logger,
  valueServiceUrl: URL,
  cache: DataCache
) {
  return async (req, res) => {
    try {
      const token = req.user.token.bearer;
      const services = await getAllServices(
        valueServiceUrl,
        token,
        cache,
        logger
      );

      // extract the roadmap data from each service
      const csvData = Object.values(services).reduce((acc, service) => {
        if (service.roadmap && service.roadmap.length > 0) {
          service.roadmap.forEach((item) => {
            acc.push({
              when: item.when,
              provider: service.provider,
              service: service.serviceName,
              title: item.title,
              description: item.description,
              status: item.status,
              impacts: item.impacts,
            });
          });
        }
        return acc;
      }, []);

      // sort the csv data by querters
      csvData.sort((a, b) => {
        if (a.when === 'TBD') return 1;
        if (b.when === 'TBD') return -1;
        const regex = /(\d{4}) Q(\d)/;
        const matchA = a.when.match(regex);
        const matchB = b.when.match(regex);
        if (matchA && matchB) {
          if (matchA[1] !== matchB[1]) return matchA[1] - matchB[1];
          return matchA[2] - matchB[2];
        }
      });

      // create the csv content
      const csvHeaders = Object.keys(csvData[0]).map((header) => {
        return header.charAt(0).toUpperCase() + header.slice(1).toLowerCase();
      });

      const csvRows = csvData.map((row) =>
        Object.keys(row).map((header) => {
          const value = row[header];
          if (header === 'description' || header === 'impacts') {
            return `"${value}"`;
          } else {
            return value;
          }
        })
      );

      const csvContent = [csvHeaders.join(',')].concat(
        csvRows.map((row) => row.join(','))
      ).join('\n');

      res.setHeader(
        'Content-Disposition',
        'attachment; filename="services.csv"'
      );
      res.setHeader('Content-Type', 'text/csv');
      res.send(csvContent);
    } catch (error) {
      reqestErrorHandler(
        error,
        logger,
        'failed to get a list of services',
        res
      );
    }
  };
}

export function getServices(
  logger: Logger,
  valueServiceUrl: URL,
  cache: DataCache
): RequestHandler {
  return async (req, res) => {
    try {
      const token = req.user.token.bearer;
      const services = await getAllServices(
        valueServiceUrl,
        token,
        cache,
        logger
      );

      if (services) {
        res
          .status(200)
          .send({ services: Object.values(services).filter((s) => !!s) });
      } else {
        res.status(404).send({ error: 'no services found' });
      }
    } catch (error) {
      reqestErrorHandler(
        error,
        logger,
        'failed to get a list of services',
        res
      );
    }
  };
}

export function getService(
  logger: Logger,
  valueServiceUrl: URL,
  cache: DataCache
): RequestHandler {
  return async (req, res) => {
    const serviceId = req.params.serviceId;

    try {
      const token = req.user.token.bearer;
      const services = await getAllServices(
        valueServiceUrl,
        token,
        cache,
        logger
      );

      if (services[serviceId]) {
        res.status(200).send({ serviceInfo: services[serviceId] });
      } else {
        res
          .status(404)
          .send({ error: `service not found with id=${serviceId}` });
      }
    } catch (error) {
      reqestErrorHandler(
        error,
        logger,
        `failed to get service info for id=${serviceId}`,
        res
      );
    }
  };
}
