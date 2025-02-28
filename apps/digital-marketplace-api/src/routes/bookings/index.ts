import {
  ServiceDirectory,
  TokenProvider,
  adspId,
} from '@abgov/adsp-service-sdk';
import { Application } from 'express';
import { Logger } from 'winston';
import { createBookingsRouter } from './router';

const EVENT_API_ID = adspId`urn:ads:platform:event-service:v1`;
const CALENDAR_API_ID = adspId`urn:ads:platform:calendar-service:v1`;

interface MiddlewareOptions {
  logger: Logger;
  directory: ServiceDirectory;
  tokenProvider: TokenProvider;
  RECAPTCHA_SECRET?: string;
}

export async function applyBookingsGatewayMiddleware(
  app: Application,
  { logger, directory, tokenProvider }: MiddlewareOptions,
) {
  const eventServiceUrl = await directory.getServiceUrl(EVENT_API_ID);
  const calendarServiceUrl = await directory.getServiceUrl(CALENDAR_API_ID);

  const bookingsRouter = createBookingsRouter({
    logger,
    tokenProvider,
    eventServiceUrl,
    calendarServiceUrl,
  });

  app.use('/marketplace/v1', bookingsRouter);

  return app;
}
