import { TokenProvider } from '@abgov/adsp-service-sdk';
import { RequestHandler, Router } from 'express';
import { Logger } from 'winston';
import axios, { isAxiosError } from 'axios';
import { SiteVerifyResponse } from './types';
import { environment } from '../../environments/environment';

interface RouterOptions {
  logger: Logger;
  tokenProvider: TokenProvider;
  formApiUrl: URL;
  eventServiceUrl: URL;
  RECAPTCHA_SECRET?: string;
}

export function verifyCaptcha(
  logger: Logger,
  RECAPTCHA_SECRET: string,
  SCORE_THRESHOLD = 0.5,
): RequestHandler {
  return async (req, _res, next) => {
    if (!RECAPTCHA_SECRET) {
      next();
    } else {
      try {
        const { token } = req.body;
        const { data } = await axios.post<SiteVerifyResponse>(
          `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`,
        );
        console.log(data);

        if (
          !data.success ||
          !['submit'].includes(data.action) ||
          data.score < SCORE_THRESHOLD
        ) {
          logger.warn(
            `Captcha verification failed for form gateway with result '${data.success}' on action '${data.action}' with score ${data.score}.`,
            { context: 'DigitalMarketplace' },
          );

          return _res
            .status(401)
            .send(
              'Request rejected because captcha verification not successful.',
            );
        }

        next();
      } catch (err) {
        next(err);
      }
    }
  };
}
export function submitSupplierForm(
  logger: Logger,
  formApiUrl: URL,
  eventServiceUrl: URL,
  tokenProvider: TokenProvider,
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
        },
      );

      if (submitSupplierForm.data.status === 'submitted') {
        await axios.post(
          `${eventServiceUrl}/events`,
          {
            namespace: 'marketplace',
            name: 'notify-user',
            timestamp: new Date().toISOString(),
            payload: {
              userEmail: supplierFormData.email,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const signupEmailsNotify = environment.SIGNUP_NOTIFY_EMAILS.split(',');

        // Notify the signup email reviewers
        await Promise.all(
          signupEmailsNotify.map((email) =>
            axios.post(
              `${eventServiceUrl}/events`,
              {
                namespace: 'marketplace',
                name: 'notify-staff',
                timestamp: new Date().toISOString(),
                payload: {
                  userEmail: email,
                  formType: 'Supplier',
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            ),
          ),
        );
      }

      res.status(200).send({
        result: {
          id: submitSupplierForm.data.id,
          status: submitSupplierForm.data.status,
        },
      });
    } catch (e) {
      if (isAxiosError(e)) {
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
  eventServiceUrl: URL,
  tokenProvider: TokenProvider,
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
        },
      );

      if (submitStakeholderForm.data.status === 'submitted') {
        await axios.post(
          `${eventServiceUrl}/events`,
          {
            namespace: 'marketplace',
            name: 'notify-user',
            timestamp: new Date().toISOString(),
            payload: {
              userEmail: partnerFormData.email,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const signupEmailsNotify = environment.SIGNUP_NOTIFY_EMAILS.split(',');

        // Notify the signup email reviewers
        await Promise.all(
          signupEmailsNotify.map((email) =>
            axios.post(
              `${eventServiceUrl}/events`,
              {
                namespace: 'marketplace',
                name: 'notify-staff',
                timestamp: new Date().toISOString(),
                payload: {
                  userEmail: email,
                  formType: 'Stakeholder',
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            ),
          ),
        );
      }

      res.status(200).send({
        result: {
          id: submitStakeholderForm.data.id,
          status: submitStakeholderForm.data.status,
        },
      });
    } catch (e) {
      if (isAxiosError(e)) {
        res.status(e.response.status).send(e.response.data);
        logger.error(e.response.data, 'Failed to submit stakeholder form');
      } else {
        res.status(400).send({ error: e });
        logger.error(e, 'Failed to submit stakeholder form');
      }
    }
  };
}

export function createFormsRouter({
  logger,
  tokenProvider,
  formApiUrl,
  eventServiceUrl,
  RECAPTCHA_SECRET,
}: RouterOptions): Router {
  const router = Router();

  router.post(
    '/forms/supplier',
    verifyCaptcha(logger, RECAPTCHA_SECRET, 0.7),
    submitSupplierForm(logger, formApiUrl, eventServiceUrl, tokenProvider),
  );
  router.post(
    '/forms/stakeholder',
    verifyCaptcha(logger, RECAPTCHA_SECRET, 0.7),
    submitStakeholderForm(logger, formApiUrl, eventServiceUrl, tokenProvider),
  );

  return router;
}
