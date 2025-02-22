import { RequestHandler, Router } from 'express';
import { Logger } from 'winston';
import axios from 'axios';
import { SiteVerifyResponse, RouterOptions } from './types';
import { bookEvent, getAvailableBookings } from './services';
import { environment } from '../../environments/environment';
import { validateBookingData } from './middlewares/index';

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

export function createBookingsRouter({
  logger,
  tokenProvider,
  eventServiceUrl,
  calendarServiceUrl,
}: RouterOptions): Router {
  const router = Router();

  router.get(
    '/bookings/availability',
    getAvailableBookings(logger, tokenProvider, calendarServiceUrl),
  );

  router.post(
    '/bookings',
    verifyCaptcha(logger, environment.RECAPTCHA_SECRET),
    validateBookingData(logger, tokenProvider, calendarServiceUrl),
    bookEvent(logger, tokenProvider, calendarServiceUrl, eventServiceUrl),
  );

  return router;
}
