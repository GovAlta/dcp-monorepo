import {
  AdspId,
  TokenProvider,
  getContextTrace,
} from '@abgov/adsp-service-sdk';
import { RequestHandler, Router } from 'express';
import { Logger } from 'winston';

interface RouterOptions {
  logger: Logger;
  tokenProvider: TokenProvider;
  formApiUrl: URL;
}

export function submitSupplierForm(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider,
): RequestHandler {
  return async (req, res) => {
    try {
      // const { tenant: tenantName } = req.body;

      const token = await tokenProvider.getAccessToken();

      res.send({ ok: true, token });
    } catch (e) {
      logger.error(e);
    }
  };
}
export function submitStakeholderForm(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider,
): RequestHandler {
  return async (req, res) => {
    try {
      // const { tenant: tenantName } = req.body;

      const token = await tokenProvider.getAccessToken();

      res.send({ ok: true, token });
    } catch (e) {
      logger.error(e);
    }
  };
}
export function submitBuyerForm(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider,
): RequestHandler {
  return async (req, res) => {
    try {
      // const { tenant: tenantName } = req.body;

      const token = await tokenProvider.getAccessToken();

      res.send({ ok: true, token });
    } catch (e) {
      logger.error(e);
    }
  };
}

export function createFormsRouter({
  logger,
  tokenProvider,
  formApiUrl,
}: RouterOptions): Router {
  const router = Router();

  router.post(
    '/forms/buyer',
    submitBuyerForm(logger, formApiUrl, tokenProvider)
  );
  router.post(
    '/forms/supplier',
    submitSupplierForm(logger, formApiUrl, tokenProvider)
  );
  router.post(
    '/forms/stakeholder',
    submitStakeholderForm(logger, formApiUrl, tokenProvider)
  );

  return router;
}
