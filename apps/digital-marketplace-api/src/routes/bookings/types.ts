import { TokenProvider } from '@abgov/adsp-service-sdk';
import { Logger } from 'winston';

export interface SiteVerifyResponse {
  success: boolean;
  score: number;
  action: string;
}

export interface RouterOptions {
  logger: Logger;
  tokenProvider: TokenProvider;
  eventServiceUrl: URL;
  calendarServiceUrl: URL;
}

export interface CalendarData {
  results: CalendarDay[];
  page: {
    next: string;
    size: number;
  };
}

export interface CalendarDay {
  id: number;
  date: string;
  dayOfWeek: number;
  isWeekend: boolean;
  isHoliday: boolean;
  isBusinessDay: boolean;
  holiday: string | null;
  isInLieuOfDay: boolean;
}

export interface CalendarEventsData {
  results: CalendarEvent[];
  page: {
    next: string;
    size: number;
  };
}

export interface CalendarEvent {
  id: number;
  recordId: string;
  context: string | null;
  name: string;
  description: string;
  start: string;
  end: string;
  isAllDay: boolean;
  isPublic: boolean;
}
