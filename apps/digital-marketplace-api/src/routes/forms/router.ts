import {
  AdspId,
  TenantService,
  TokenProvider,
  getContextTrace,
} from '@abgov/adsp-service-sdk';
import { RequestHandler, Router } from 'express';
import { Logger } from 'winston';

interface RouterOptions {
  logger: Logger;
  tokenProvider: TokenProvider;
  tenantService: TenantService;
  formApiUrl: URL;
}

export function submitBuyerForm(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider,
  tenantService: TenantService
): RequestHandler {
  return async (req, res) => {
    try {
      const { tenant: tenantName } = req.body;

      const token = await tokenProvider.getAccessToken();
      const tenant = await tenantService.getTenantByName(
        tenantName?.replace(/-/g, ' ')
      );
      if (!tenant) {
        console.error(`Tenant ${tenantName} not found`);
      }
      logger.debug(`Submitting simple form based on definition (ID: $})...`, {
        context: 'GatewayRouter',
        tenant: tenant.id.toString(),
        token,
      });
      res.send({ ok: true });
    } catch (e) {
      logger.error(e);
    }
  };
}



export function createFormsRouter({
  logger,
  tokenProvider,
  tenantService,
  formApiUrl,
}: RouterOptions): Router {
  const router = Router();

  router.post(
    '/forms/buyer',
    submitBuyerForm(logger, formApiUrl, tokenProvider, tenantService)
  );

  return router;
}
