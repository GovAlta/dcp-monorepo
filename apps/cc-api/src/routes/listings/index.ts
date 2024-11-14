import {
  ServiceDirectory,
  TokenProvider,
  adspId,
} from '@abgov/adsp-service-sdk';
import { Application } from 'express';
import { Logger } from 'winston';
import { createListingsRouter } from './router';
import { DataCache } from '../../cache/types';

const FORM_API_ID = adspId`urn:ads:platform:form-service:v1`;
const EVENT_API_ID = adspId`urn:ads:platform:event-service:v1`;
const VALUE_API_ID = adspId`urn:ads:platform:value-service:v1`;

interface MiddlewareOptions {
  logger: Logger;
  directory: ServiceDirectory;
  tokenProvider: TokenProvider;
  cache: DataCache;
}

export async function applyGatewayMiddleware(
  app: Application,
  { logger, directory, tokenProvider, cache }: MiddlewareOptions
) {
  const formApiUrl = await directory.getServiceUrl(FORM_API_ID);
  const eventServiceUrl = await directory.getServiceUrl(EVENT_API_ID);
  const valueServiceUrl = await directory.getServiceUrl(VALUE_API_ID);

  const listingsRouter = createListingsRouter({
    logger,
    tokenProvider,
    formApiUrl,
    eventServiceUrl,
    valueServiceUrl,
    cache
  });
  
  app.use('/cc/v1', listingsRouter);

  return app;
}
