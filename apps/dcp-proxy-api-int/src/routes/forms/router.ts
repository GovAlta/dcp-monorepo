import { TokenProvider } from '@abgov/adsp-service-sdk';
import { RequestHandler, Router } from 'express';
import { Logger } from 'winston';
import axios from 'axios';

interface RouterOptions {
  logger: Logger;
  tokenProvider: TokenProvider;
  formApiUrl: URL;
}
export function downloadBuyerFormData(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider
): RequestHandler {
  return async (req, res) => {
    try {
      const token = await tokenProvider.getAccessToken();

      let after: string | undefined;
      const submittedBuyerForms: any[] = [];
      do {
        const { data: res } = await axios.get(
          `${formApiUrl}/forms?criteria={"definitionIdEquals":"buyer-form"}&top=10${after ? `&after=${after}` : ''}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        submittedBuyerForms.push(...res.results);
        after = res.page.next ? `"${res.page.next}${res.results[res.results.length - 1].id}"` : undefined;
        console.log("after id",after);
      } while (after !== undefined);

      const submittedForms = submittedBuyerForms;
      let formDetailsPromises: Promise<any>[] = [];
      const formDetails: any[] = [];
      for (const form of submittedForms) {
        formDetailsPromises.push(
          axios
            .get(`${formApiUrl}/forms/${form.id}/data`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => response.data)
        );

        if (formDetailsPromises.length >= 10) {
          const responses = await Promise.all(formDetailsPromises);
          formDetails.push(...responses);
          formDetailsPromises = [];
        }
      }
      if (formDetailsPromises.length > 0) {
        const responses = await Promise.all(formDetailsPromises);
        formDetails.push(...responses);
      }

      const formDefinition = await axios.get(`${formApiUrl}/definitions/buyer-form`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const headers = Object.keys(formDefinition.data.dataSchema.properties);
      const csv = [headers.map((header) => `"${header.replace(/"/g, '""')}"`).join(",")].concat(
        formDetails.map((form) => {
          return headers.map((header) => {
            const value = form.data[header];
            return `"${String(value).replace(/"/g, '""').replace(/,/g, '\,')}"`;
          }).join(",");
        })
      );

      res.setHeader('Content-Disposition', 'attachment; filename="forms.csv"');
      res.setHeader('Content-Type', 'text/csv');
      res.send(Buffer.from(csv.join("\n")));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        res.status(e.response.status).send(e.response.data);
        logger.error(e.response.data, 'Failed to download buyer form data');
      } else {
        res.status(400).send({ error: e });
        logger.error(e, 'Failed to download buyer form data');
      }
    }
  };
}

export function downloadSupplierFormData(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider
): RequestHandler {
  return async (req, res) => {
    try {
      const token = await tokenProvider.getAccessToken();

      let after: string | undefined;
      const submittedSupplierForms: any[] = [];
      do {
        const { data: res } = await axios.get(
          `${formApiUrl}/forms?criteria={"definitionIdEquals":"supplier-form"}&top=10${after ? `&after=${after}` : ''}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        submittedSupplierForms.push(...res.results);
        after = res.page.next ? `"${res.page.next}${res.results[res.results.length - 1].id}"` : undefined;
        console.log("after id",after);
      } while (after !== undefined);

      const submittedForms = submittedSupplierForms;
      let formDetailsPromises: Promise<any>[] = [];
      const formDetails: any[] = [];
      for (const form of submittedForms) {
        formDetailsPromises.push(
          axios
            .get(`${formApiUrl}/forms/${form.id}/data`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => response.data)
        );

        if (formDetailsPromises.length >= 10) {
          const responses = await Promise.all(formDetailsPromises);
          formDetails.push(...responses);
          formDetailsPromises = [];
        }
      }
      if (formDetailsPromises.length > 0) {
        const responses = await Promise.all(formDetailsPromises);
        formDetails.push(...responses);
      }

      const formDefinition = await axios.get(`${formApiUrl}/definitions/supplier-form`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const headers = Object.keys(formDefinition.data.dataSchema.properties);
      const csv = [headers.map((header) => `"${header.replace(/"/g, '""')}"`).join(",")].concat(
        formDetails.map((form) => {
          return headers.map((header) => {
            const value = form.data[header];
            return `"${String(value).replace(/"/g, '""').replace(/,/g, '\,')}"`;
          }).join(",");
        })
      );

      res.setHeader('Content-Disposition', 'attachment; filename="forms.csv"');
      res.setHeader('Content-Type', 'text/csv');
      res.send(Buffer.from(csv.join("\n")));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        res.status(e.response.status).send(e.response.data);
        logger.error(e.response.data, 'Failed to download supplier form data');
      } else {
        res.status(400).send({ error: e });
        logger.error(e, 'Failed to download supplier form data');
      }
    }
  };
}

export function downloadPartnerFormData(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider
): RequestHandler {
  return async (req, res) => {
    try {
      const token = await tokenProvider.getAccessToken();

      let after: string | undefined;
      const submittedPartnerForms: any[] = [];
      do {
        const { data: res } = await axios.get(
          `${formApiUrl}/forms?criteria={"definitionIdEquals":"partner-form"}&top=10${after ? `&after=${after}` : ''}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        submittedPartnerForms.push(...res.results);
        after = res.page.next ? `"${res.page.next}${res.results[res.results.length - 1].id}"` : undefined;
        console.log("after id",after);
      } while (after !== undefined);

      const submittedForms = submittedPartnerForms;
      let formDetailsPromises: Promise<any>[] = [];
      const formDetails: any[] = [];
      for (const form of submittedForms) {
        formDetailsPromises.push(
          axios
            .get(`${formApiUrl}/forms/${form.id}/data`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => response.data)
        );

        if (formDetailsPromises.length >= 10) {
          const responses = await Promise.all(formDetailsPromises);
          formDetails.push(...responses);
          formDetailsPromises = [];
        }
      }
      if (formDetailsPromises.length > 0) {
        const responses = await Promise.all(formDetailsPromises);
        formDetails.push(...responses);
      }

      const formDefinition = await axios.get(`${formApiUrl}/definitions/partner-form`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const headers = Object.keys(formDefinition.data.dataSchema.properties);
      const csv = [headers.map((header) => `"${header.replace(/"/g, '""')}"`).join(",")].concat(
        formDetails.map((form) => {
          return headers.map((header) => {
            const value = form.data[header];
            return `"${String(value).replace(/"/g, '""').replace(/,/g, '\,')}"`;
          }).join(",");
        })
      );

      res.setHeader('Content-Disposition', 'attachment; filename="forms.csv"');
      res.setHeader('Content-Type', 'text/csv');
      res.send(Buffer.from(csv.join("\n")));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        res.status(e.response.status).send(e.response.data);
        logger.error(e.response.data, 'Failed to download supplier form data');
      } else {
        res.status(400).send({ error: e });
        logger.error(e, 'Failed to download supplier form data');
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

  router.get(
    '/forms/buyer/downloadcsv',
    downloadBuyerFormData(logger, formApiUrl, tokenProvider)
  );
  router.get(
    '/forms/supplier/downloadcsv',
    downloadSupplierFormData(logger, formApiUrl, tokenProvider)
  );
  router.get(
    '/forms/partner/downloadcsv',
    downloadPartnerFormData(logger, formApiUrl, tokenProvider)
  );

  return router;
}
