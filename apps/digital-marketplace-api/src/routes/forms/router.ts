import { TokenProvider } from '@abgov/adsp-service-sdk';
import { RequestHandler, Router } from 'express';
import { Logger } from 'winston';
import axios from 'axios';

interface RouterOptions {
  logger: Logger;
  tokenProvider: TokenProvider;
  formApiUrl: URL;
}

export function submitSupplierForm(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider
): RequestHandler {
  return async (req, res) => {
    try {
      const token = await tokenProvider.getAccessToken();
      const supplierFormData = req.body;

      const submitSupplierForm = await axios.post(
        `${formApiUrl}/forms`,
        {
          definitionId: 'supplier-form',
          data: supplierFormData,
          submit: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      res.status(200).send({
        result: {
          id: submitSupplierForm.data.id,
          status: submitSupplierForm.data.status,
        },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        res.status(e.response.status).send(e.response.data);
        logger.error(e.response.data, 'Failed to submit supplier form');
      } else {
        res.status(400).send({ error: e });
        logger.error(e, 'Failed to submit supplier form');
      }
    }
  };
}
export function submitStakeholderForm(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider
): RequestHandler {
  return async (req, res) => {
    try {
      const token = await tokenProvider.getAccessToken();
      const partnerFormData = req.body;

      const submitStakeholderForm = await axios.post(
        `${formApiUrl}/forms`,
        {
          definitionId: 'partner-form',
          data: partnerFormData,
          submit: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      res.status(200).send({
        result: {
          id: submitStakeholderForm.data.id,
          status: submitStakeholderForm.data.status,
        },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        res.status(e.response.status).send(e.response.data);
        logger.error(e.response.data, 'Failed to submit stakeholder form');
      } else {
        res.status(400).send({ error: e });
        logger.error(e, 'Failed to submit stakeholder form');
      }
    }
  };
}
export function submitBuyerForm(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider
): RequestHandler {
  return async (req, res) => {
    try {
      const token = await tokenProvider.getAccessToken();
      const buyerFormData = req.body;

      const submitBuyerForm = await axios.post(
        `${formApiUrl}/forms`,
        {
          definitionId: 'buyer-form',
          data: buyerFormData,
          submit: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      res.status(200).send({
        result: {
          id: submitBuyerForm.data.id,
          status: submitBuyerForm.data.status,
        },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        res.status(e.response.status).send(e.response.data);
        logger.error(e.response.data, 'Failed to submit buyer form');
      } else {
        res.status(400).send({ error: e });
        logger.error(e, 'Failed to submit buyer form');
      }
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
