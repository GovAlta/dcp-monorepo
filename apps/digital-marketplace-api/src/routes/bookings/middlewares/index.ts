import { TokenProvider } from '@abgov/adsp-service-sdk';
import { environment } from '../../../environments/environment';
import { RequestHandler } from 'express';
import { Logger } from 'winston';
import axios from 'axios';
import {
    BookingRequest,
    CalendarData,
    CalendarEvent,
    CalendarEventsData,
} from '../types';
import axiosRetry, { exponentialDelay } from 'axios-retry';

axiosRetry(axios, { retries: 3, retryDelay: exponentialDelay });

/**
 * Validates the booking request data.
 *
 * It checks if the booking request data contains all the required fields and
 * if the date is a valid business day. It also checks if the event is already
 * created. If the event is already created, it checks if its a duplicate attendee request for that event and
 * if the slot is full for the AM or PM slot.
 *
 * @param reqBody - The booking request data.
 * @returns A middleware function that validates the booking request data and
 *          returns a 400 error response if the data is invalid.
 */
export function validateBookingData(
    logger: Logger,
    tokenProvider: TokenProvider,
    calendarServiceUrl: URL,
): RequestHandler {
    return async (req, res, next) => {
        const reqBody: BookingRequest = req.body;
        const { date, slot, calendarId, email } = reqBody;
        if (!date || !slot || !calendarId) {
            return res.status(400).send({ error: 'Missing required fields' });
        }
        const token = await tokenProvider.getAccessToken();

        // format current date + buffer
        const todaysData = new Date();
        const timeZone = 'America/Edmonton';
        const timeZoneOffset = new Date().toLocaleString('en-US', { timeZone });
        const offsetInHours = new Date(timeZoneOffset).getTimezoneOffset() / 60;
        todaysData.setHours(todaysData.getHours() - offsetInHours);
        todaysData.setDate(
            todaysData.getDate() + Number(environment.BOOKINGS_DAYS_AHEAD),
        );
        const currentDatePlus5Days = todaysData
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, ''); //YYYYMMDD
        const formattedBookingDate = date.replace(/-/g, ''); //20250113, example
        const BOOKING_DAYS_AVAILABLE = environment.BOOKING_DAYS_AVAILABLE;

        // get next available business days
        const getBusinessDates = await axios.get<CalendarData>(
            `${calendarServiceUrl}/dates?top=${BOOKING_DAYS_AVAILABLE}&criteria={"min": "${currentDatePlus5Days}", "isHoliday": false,"isBusinessDay": true}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        res.locals.businessDay = getBusinessDates.data.results;

        // check if the date is a valid business day
        const getBusinessDay = getBusinessDates.data.results.filter(
            (businessDay) =>
                businessDay.id.toString() === formattedBookingDate &&
                businessDay.isBusinessDay,
        );
        res.locals.isNotValidBusinessDay = getBusinessDay.length === 0;
        if (res.locals.isNotValidBusinessDay) {
            return res
                .status(400)
                .send({ error: 'Date is not a valid business day' });
        }

        // get current bookings
        const getCurrentBookings = await axios.get<CalendarEventsData>(
            `${calendarServiceUrl}/calendars/${calendarId}/events?top=${BOOKING_DAYS_AVAILABLE}&criteria={"startsAfter": "${date}"}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        res.locals.currentBookings = getCurrentBookings.data.results;

        // check if the event is already created else create new event with a new attendee
        const existingBooking = getCurrentBookings.data.results.filter(
            (booking) =>
                booking.recordId === formattedBookingDate &&
                booking.name.includes(slot),
        );
        res.locals.existingBooking = existingBooking.length > 0;

        if (res.locals.existingBooking) {
            //  check if its duplicate attendee request for that event
            const getEventAttendees = await Promise.all(
                existingBooking.map(async (booking) => {
                    const eventAttendees = await axios.get<CalendarEvent>(
                        `${calendarServiceUrl}/calendars/${calendarId}/events/${booking.id}?includeAttendees=true`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );
                    return eventAttendees.data;
                }),
            );

            // combine AM and PM attendees
            const combinedAttendees = getEventAttendees.reduce((acc, event) => {
                return acc.concat(event.attendees || []);
            }, []);
            res.locals.eventAttendees = combinedAttendees;
            console.log(combinedAttendees);
            // check for duplicate attendee
            if (email) {
                const isDuplicateAttendee = combinedAttendees.filter(
                    (attendee) => attendee.email === email,
                );
                if (isDuplicateAttendee.length > 0) {
                    return res.status(400).send({
                        error: 'Duplicate attendee, cant make another booking on same day',
                    });
                }
            }

            // check if the slot is full for the AM or PM slot
            const getSlottedBookings = getEventAttendees.filter((booking) =>
                booking.name.includes(slot),
            );
            const isSlotFull =
                getSlottedBookings[0]?.attendees.length >=
                parseInt(environment.MAX_BOOKING_PER_SLOT);
            res.locals.eventAttendees.id = getSlottedBookings[0].id;
            if (isSlotFull) {
                return res.status(400).send({ error: 'Slot is full' });
            }
        }
        next();
    };
}
