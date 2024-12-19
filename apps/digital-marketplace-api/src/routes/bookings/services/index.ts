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

function mapBusinessDaysData(data) {
  return data.map((item) => {
    return {
      id: item.id,
      date: item.date.slice(0, 10),
      dayOfWeek: item.dayOfWeek,
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
      const mappedData = {
        currentEvents: mapEventData(getCurrentBookingsAttendees),
        businessDays: mapBusinessDaysData(getBusinessDates.data.results),
      };
      // Initialize the result object with two properties: availableDateToBook and bookingsAvailability
      const result = {
        availableDatesToBook: [], // array to store dates that have at least one available period
        bookingsAvailability: {}, // object to store availability of each period for each date
      };
      // Iterate over each business day
      mappedData.businessDays.forEach((businessDay) => {
        const date = businessDay.date;
        const events = mappedData.currentEvents.filter(
          (event) => event.recordId === businessDay.id.toString()
        );

        // Initialize the availability object with both AM and PM periods set to true
        const availability = {
          AM: true,
          PM: true,
        };

        // Iterate over each event for the current date and update the availability object
        events.forEach((event) => {
          availability[event.period] = event.isBookable;
        });

        // Check if at least one period is available for the current date
        if (Object.values(availability).some((isBookable) => isBookable)) {
          result.availableDatesToBook.push(date);
        }

        // Add the availability object to the bookingsAvailability object
        result.bookingsAvailability[date] = availability;
      });
      res.status(200).send({
        ...result,
      });
    } catch (error) {
      console.log(error);
      requestErrorHandler(error, logger, 'failed to get current bookings', res);
    }
  };
}
