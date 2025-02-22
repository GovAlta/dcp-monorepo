import { TokenProvider } from '@abgov/adsp-service-sdk';
import { RequestHandler, Router } from 'express';
import { Logger } from 'winston';
import axios, { isAxiosError } from 'axios';

const formIds = {
  eventsignup: 'marketplace-event-2-signup',
  supplier: 'supplier-form',
  partner: 'partner-form',
};

interface RouterOptions {
  logger: Logger;
  tokenProvider: TokenProvider;
  formApiUrl: URL;
}

function formatToMST(dateStr) {
  const date = new Date(dateStr);
  const formattedDateMST = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Denver', // Adjusts for MST with DST
  }).format(date);

  return formattedDateMST.replace(',', '');
}

export function downloadFormData(
  logger: Logger,
  formApiUrl: URL,
  tokenProvider: TokenProvider,
  formId: string,
): RequestHandler {
  return async (req, res) => {
    try {
      const token = await tokenProvider.getAccessToken();

      let after: string | undefined;
      const submittedForms = [];
      do {
        const { data: res } = await axios.get(
          `${formApiUrl}/forms?criteria={"definitionIdEquals":"${formId}"}&includeData=true&top=50${
            after ? `&after=${after}` : ''
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        submittedForms.push(...res.results);
        after = res.page.next
          ? `"${res.page.next}${res.results[res.results.length - 1].id}"`
          : undefined;
        console.log('after id', after);
      } while (after !== undefined);
      const formDefinition = await axios.get(
        `${formApiUrl}/definitions/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      //formatting created date
      submittedForms.forEach((form) => {
        if (form) {
          form.data.created = formatToMST(form.created);
        }
      });

      const headers = [
        ...Object.keys(formDefinition.data.dataSchema.properties),
        'created',
      ];
      const csv = [
        headers.map((header) => `"${header.replace(/"/g, '""')}"`).join(','),
      ].concat(
        submittedForms.map((form) => {
          return headers
            .map((header) => {
              const value = form.data[header];
              return `"${String(value)
                .replace(/"/g, '""')
                .replace(/,/g, ',')}"`;
            })
            .join(',');
        }),
      );

      res.setHeader('Content-Disposition', 'attachment; filename="forms.csv"');
      res.setHeader('Content-Type', 'text/csv');
      res.send(Buffer.from(csv.join('\n')));
    } catch (e) {
      if (isAxiosError(e)) {
        res.status(e.response.status).send(e.response.data);
        logger.error(e.response.data, 'Failed to download form data');
      } else {
        res.status(400).send({ error: e });
        logger.error(e, 'Failed to download form data');
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

  Object.keys(formIds).forEach((formType) => {
    router.get(
      `/forms/${formType}/downloadcsv`,
      downloadFormData(logger, formApiUrl, tokenProvider, formIds[formType]),
    );
  });

  return router;
}
