import {
  ServiceDirectory,
  TokenProvider,
  adspId,
} from '@abgov/adsp-service-sdk';
import { Application } from 'express';
import { Logger } from 'winston';
import { createFormsRouter } from './router';

const FORM_API_ID = adspId`urn:ads:platform:form-service:v1`;
const EVENT_API_ID = adspId`urn:ads:platform:event-service:v1`;

interface MiddlewareOptions {
  logger: Logger;
  directory: ServiceDirectory;
  tokenProvider: TokenProvider;
  RECAPTCHA_SECRET?: string;
}

export async function applyGatewayMiddleware(
  app: Application,
  { logger, directory, tokenProvider, RECAPTCHA_SECRET }: MiddlewareOptions,
) {
  const formApiUrl = await directory.getServiceUrl(FORM_API_ID);
  const eventServiceUrl = await directory.getServiceUrl(EVENT_API_ID);

  const formsRouter = createFormsRouter({
    logger,
    tokenProvider,
    formApiUrl,
    eventServiceUrl,
    RECAPTCHA_SECRET,
  });
  app.use('/marketplace/v1', formsRouter);

  return app;
}
