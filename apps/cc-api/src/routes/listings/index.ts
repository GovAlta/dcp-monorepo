import {
  ServiceDirectory,
  TokenProvider,
  adspId,
} from '@abgov/adsp-service-sdk';
import { Application } from 'express';
import { Logger } from 'winston';
import { createListingsRouter } from './router';
import { DataCache } from '../../cache/types';
import { fetchServices } from './services';
import cron from 'node-cron';
import { environment } from '../../environments/environment';

const FORM_API_ID = adspId`urn:ads:platform:form-service:v1`;
const EVENT_API_ID = adspId`urn:ads:platform:event-service:v1`;
const VALUE_API_ID = adspId`urn:ads:platform:value-service:v1`;

interface MiddlewareOptions {
  logger: Logger;
  directory: ServiceDirectory;
  offlineAccessTokenProvider: TokenProvider;
  cache: DataCache;
}

async function refreshServicesCache(
  valueServiceUrl,
  offlineAccessTokenProvider,
  cache,
  logger
) {
  try {
    const token = await offlineAccessTokenProvider.getAccessToken();
    await fetchServices(valueServiceUrl, token, cache, logger);
  } catch (error) {
    logger.error(`Failed to refresh services cache: ${error}`);
  }
}

function initializeCache(valueServiceUrl, offlineAccessTokenProvider, cache, logger) {
  refreshServicesCache(valueServiceUrl, offlineAccessTokenProvider, cache, logger);

  const ttlMinutes = Math.floor(Number(environment.CACHE_TTL) / 60000); // 30min
  const schedule = `*/${ttlMinutes} * * * *`;
  cron.schedule(schedule, () => {
    logger.info('Refreshing cached data');
    refreshServicesCache(valueServiceUrl, offlineAccessTokenProvider, cache, logger);
  });
}

export async function applyGatewayMiddleware(
  app: Application,
  { logger, directory, offlineAccessTokenProvider, cache }: MiddlewareOptions
) {
  console.log('applying gateway middleware');
  const formApiUrl = await directory.getServiceUrl(FORM_API_ID);
  const eventServiceUrl = await directory.getServiceUrl(EVENT_API_ID);
  const valueServiceUrl = await directory.getServiceUrl(VALUE_API_ID);

  const listingsRouter = createListingsRouter({
    logger,
    offlineAccessTokenProvider,
    formApiUrl,
    eventServiceUrl,
    valueServiceUrl,
    cache,
  });

  app.use('/cc/v1', listingsRouter);

  // initializeCache(valueServiceUrl, offlineAccessTokenProvider, cache, logger);

  return app;
}
