import { TokenProvider } from '@abgov/adsp-service-sdk';
import { RequestHandler } from 'express';
import { Logger } from 'winston';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { CalendarData, CalendarEventsData } from '../types';

function requestErrorHandler(
  error: Error,
  logger: Logger,
  customMessage: string,
  res,
  status = 400
) {
  if (axios.isAxiosError(error)) {
    logger.error(error.response.data, customMessage);
    res.status(error.response.status).send(error.response.data);
  } else {
    logger.error(error.message, customMessage);
    res.status(status).send({ error: error });
  }
}
function mapEventData(data) {
  return data.map((booking) => {
    const nameParts = booking.name.split('-');
    const period = nameParts[nameParts.length - 1].toUpperCase(); // Extract the last part of the name and convert to uppercase
    return {
      id: booking.id,
      recordId: booking.recordId,
      period,
      isBookable:
        booking.attendees.length < Number(environment.MAX_BOOKING_PER_SLOT),
    };
  });
}
export function getAvailableBookings(
  logger: Logger,
  tokenProvider: TokenProvider,
  calendarServiceUrl: URL
): RequestHandler {
  return async (req, res) => {
    try {
      const token = await tokenProvider.getAccessToken();

      const calendarId = req.query.calendarId;    

      // format current date + buffer
      const date = new Date();
      date.setDate(date.getDate() + Number(environment.BOOKINGS_DAYS_AHEAD));
      const currentDatePlus5Days = date
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, ''); //YYYYMMDD
      const BOOKING_DAYS_AVAILABLE = environment.BOOKING_DAYS_AVAILABLE;

      // get next available business days
      const getBusinessDates = await axios.get<CalendarData>(
        `${calendarServiceUrl}/dates?top=${BOOKING_DAYS_AVAILABLE}&criteria={"min": "${currentDatePlus5Days}", "isHoliday": false,"isBusinessDay": true}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const firstAvailableBusinessDay =
        getBusinessDates.data.results[0].id.toString(); // YYYYMMDD

      const formattedFirstAvailableBusinessDay = `${firstAvailableBusinessDay.slice(
        0,
        4
      )}-${firstAvailableBusinessDay.slice(
        4,
        6
      )}-${firstAvailableBusinessDay.slice(6, 8)}`; // YYYY-MM-DD

      // get current bookings
      const getCurrentBookings = await axios.get<CalendarEventsData>(
        `${calendarServiceUrl}/calendars/${calendarId}/events?top=${BOOKING_DAYS_AVAILABLE}&criteria={"startsAfter": "${formattedFirstAvailableBusinessDay}"}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // get bookings attendees
      const getCurrentBookingsAttendees = await Promise.all(
        getCurrentBookings.data.results.map(async (booking) => {
          const getBookingAttendees = await axios.get<CalendarEventsData>(
            `${calendarServiceUrl}/calendars/${calendarId}/events/${booking.id}?includeAttendees=true`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return getBookingAttendees.data;
        })
      );

      res.status(200).send({
        currentEvents: mapEventData(getCurrentBookingsAttendees),
      });
    } catch (error) {
      console.log(error);
      requestErrorHandler(
        error,
        logger,
        'failed to get current bookings',
        res
      );
    }
  };
}
