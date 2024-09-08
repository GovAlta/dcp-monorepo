import {
  ServiceDirectory,
  TokenProvider,
  adspId,
} from '@abgov/adsp-service-sdk';
import { Application } from 'express';
import { Logger } from 'winston';
import { createFormsRouter } from './router';

const FORM_API_ID = adspId`urn:ads:platform:form-service:v1`;

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

  const formsRouter = createFormsRouter({
    logger,
    tokenProvider,
    formApiUrl,
  });
  app.use('/marketplace/v1', formsRouter);

  return app;
}
