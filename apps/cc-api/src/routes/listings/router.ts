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


export function getFormsSchema(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider
): RequestHandler {
  return async (req, res) => {

    try {
      const token = await tokenProvider.getAccessToken();
      const { definitionId } = req.params;

      const getFormsSchemaData = await axios.get(
        `${formApiUrl}/definitions/${definitionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      res.status(200).send({
        dataSChema: getFormsSchemaData.data.dataSchema,
        uiSchema: getFormsSchemaData.data.uiSchema
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        res.status(e.response.status).send(e.response.data);
        logger.error(e.response.data, 'failed to get forms schema');
      } else {
        res.status(400).send({ error: e });
        logger.error(e, 'failed to get forms schema');
      }
    }

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
    '/listings/schema/:definitionId',
    getFormsSchema(logger, formApiUrl, tokenProvider)
  );
  return router;
}
