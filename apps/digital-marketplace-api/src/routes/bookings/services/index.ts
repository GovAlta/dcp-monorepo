import { TokenProvider } from '@abgov/adsp-service-sdk';
import { RequestHandler } from 'express';
import { Logger } from 'winston';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import {
  BookingRequest,
  BookingTimeslots,
  CalendarData,
  CalendarEventsData,
} from '../types';

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
      const timeZone = 'America/Edmonton';
      const timeZoneOffset = new Date().toLocaleString('en-US', { timeZone });
      const offsetInHours = new Date(timeZoneOffset).getTimezoneOffset() / 60;
      date.setHours(date.getHours() - offsetInHours);
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
      const result: BookingTimeslots = {
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

export function bookEvent(
  logger: Logger,
  tokenProvider: TokenProvider,
  calendarServiceUrl: URL,
  eventServiceUrl: URL
): RequestHandler {
  return async (req, res) => {
    try {
      const token = await tokenProvider.getAccessToken();
      const reqBody: BookingRequest = req.body;
      const timeslots = {
        AM: {
          start: 'T09:00:00-07:00',
          end: 'T12:00:00-07:00',
        },
        PM: {
          start: 'T13:00:45-07:00',
          end: 'T15:00:00-07:00',
        },
      };

      if (res.locals.existingBooking) {

        // create an attendee
        await axios.post(
          `${calendarServiceUrl}/calendars/${reqBody.calendarId}/events/${res.locals.eventAttendees.id}/attendees`,
          {
            name: `${reqBody.firstName} ${reqBody.lastName}`,
            email: reqBody.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        const bookingEventApiCall = await axios.post(
          `${calendarServiceUrl}/calendars/${reqBody.calendarId}/events`,
          {
            name: `${reqBody.date}-${reqBody.slot}`,
            start: `${reqBody.date}${timeslots[reqBody.slot].start}`, //'2024-12-25T08:00:45-07:00', example
            recordId: reqBody.date.replace(/-/g, ''), // 20241225, example
            description: 'consultation request',
            end: `${reqBody.date}${timeslots[reqBody.slot].end}`,
            isPublic: 'false',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await axios.post(
          `${calendarServiceUrl}/calendars/${reqBody.calendarId}/events/${bookingEventApiCall.data.id}/attendees`,
          {
            name: `${reqBody.firstName} ${reqBody.lastName}`,
            email: reqBody.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // notify booking managers
      const bookingManagerEmails =
        environment.BOOKING_CONSULTATION_EMAILS.split(',');

      // send emails to staff
      await Promise.all(
        bookingManagerEmails.map(async (email) => {
          await axios.post(
            `${eventServiceUrl}/events`,
            {
              namespace: 'marketplace',
              name: 'notify-consultation-managers',
              timestamp: new Date().toISOString(),
              payload: {
                userEmail: email,
                email: reqBody.email,
                toDiscuss: reqBody.toDiscuss,
                agreement: reqBody.agreement,
                orgName: reqBody.orgName,
                firstName: reqBody.firstName,
                lastName: reqBody.lastName,
                techProvider: reqBody.techProvider,
                date: reqBody.date,
                slot: reqBody.slot,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        })
      );

      // send email to user who submitted the form
      await axios.post(
        `${eventServiceUrl}/events`,
        {
          namespace: 'marketplace',
          name: 'notify-consultation-user',
          timestamp: new Date().toISOString(),
          payload: {
            userEmail: reqBody.email,
            email: reqBody.email,
            toDiscuss: reqBody.toDiscuss,
            orgName: reqBody.orgName,
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            date: reqBody.date,
            slot: reqBody.slot,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      res.status(200).send({
        message: 'success',
      });
    } catch (error) {
      console.log(error);
      requestErrorHandler(error, logger, 'failed to book event', res);
    }
  };
}
