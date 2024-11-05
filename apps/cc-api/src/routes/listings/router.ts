import { TokenProvider } from '@abgov/adsp-service-sdk';
import { RequestHandler, Router } from 'express';
import { Logger } from 'winston';
import axios from 'axios';

interface RouterOptions {
  logger: Logger;
  tokenProvider: TokenProvider;
  formApiUrl: URL;
  eventServiceUrl: URL;
  RECAPTCHA_SECRET?: string;
}

export function healthCheck(
  logger: Logger,
  formApiUrl: URL,
  eventServiceUrl: URL,
  tokenProvider: TokenProvider
): RequestHandler {
  return async (req, res) => {

    res.status(200).send({
      status: 'healthy',
    });

  }
}

  export function createListingsRouter({
    logger,
    tokenProvider,
    formApiUrl,
    eventServiceUrl,
  }: RouterOptions): Router {
    const router = Router();

    router.get(
      '/listings/health',
      healthCheck(logger, formApiUrl, eventServiceUrl, tokenProvider)
    );
    return router;
  }
