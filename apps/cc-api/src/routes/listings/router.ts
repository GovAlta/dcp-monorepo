import { TokenProvider } from '@abgov/adsp-service-sdk';
import { RequestHandler, Router } from 'express';
import { Logger } from 'winston';
import axios from 'axios';
import { getService, getServices } from './services';
import { DataCache, FormSchema } from '../../cache/types';
import { CacheKeys } from '../../cache';

interface RouterOptions {
  logger: Logger;
  tokenProvider: TokenProvider;
  formApiUrl: URL;
  eventServiceUrl: URL;
  valueServiceUrl: URL;
  RECAPTCHA_SECRET?: string;
  cache: DataCache;
}

export function getFormsSchema(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider,
  cache: DataCache
): RequestHandler {
  return async (req, res) => {

    try {
      const token = await tokenProvider.getAccessToken();
      const { definitionId } = req.params;
      const cachedSchemas = await cache.get(CacheKeys.SCHEMA) as FormSchema;
      let definitionSchema = cachedSchemas?.[definitionId];

      if (!definitionSchema) {
        logger.info(`No schema found in cache for definitionId=${definitionId}, fetching from value service...`);

        const getFormsSchemaData = await axios.get(
          `${formApiUrl}/definitions/${definitionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        definitionSchema = {
          dataSchema: getFormsSchemaData.data.dataSchema,
          uiSchema: getFormsSchemaData.data.uiSchema
        };

        const cacheUpdates = Object.assign({}, cachedSchemas, {
          [definitionId]: definitionSchema
        });

        await cache.set(CacheKeys.SCHEMA, cacheUpdates);
        logger.info(`Successfully fetched schema for definitionId=${definitionId}`);
      }

      res.status(200).send(definitionSchema);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        res.status(e.response.status).send(e.response.data);
        logger.error(e.response.data, 'failed to get forms schema');
      } else {
        res.status(400).send({ error: e });
        logger.error(e, 'failed to get forms schema');
      }
    }

  }
}

function clearCache(cache: DataCache): RequestHandler {
  return async (req, res) => {
    await cache.clear();
    res.status(200).send();
  }
}

export function createListingsRouter({
  logger,
  tokenProvider,
  formApiUrl,
  valueServiceUrl,
  eventServiceUrl,
  cache,
}: RouterOptions): Router {
  const router = Router();

  router.get(
    '/listings/schema/:definitionId',
    getFormsSchema(logger, formApiUrl, tokenProvider, cache)
  );

  router.get(
    '/listings/services',
    getServices(logger, valueServiceUrl, tokenProvider, cache)
  );

  router.get(
    '/listings/services/:serviceId',
    getService(logger, valueServiceUrl, tokenProvider, cache)
  );

  router.post('/cache/clear', clearCache(cache));

  return router;
}
