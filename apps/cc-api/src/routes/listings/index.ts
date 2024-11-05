import {
  ServiceDirectory,
  TokenProvider,
  adspId,
} from '@abgov/adsp-service-sdk';
import { Application } from 'express';
import { Logger } from 'winston';
import { createListingsRouter } from './router';

const FORM_API_ID = adspId`urn:ads:platform:form-service:v1`;
const EVENT_API_ID = adspId`urn:ads:platform:event-service:v1`;

interface MiddlewareOptions {
  logger: Logger;
  directory: ServiceDirectory;
  tokenProvider: TokenProvider;
}

export async function applyGatewayMiddleware(
  app: Application,
  { logger, directory, tokenProvider }: MiddlewareOptions
) {
  const formApiUrl = await directory.getServiceUrl(FORM_API_ID);
  const eventServiceUrl = await directory.getServiceUrl(EVENT_API_ID);

  const listingsRouter = createListingsRouter({
    logger,
    tokenProvider,
    formApiUrl,
    eventServiceUrl,
  });
  app.use('/cc/v1', listingsRouter);

  return app;
}
