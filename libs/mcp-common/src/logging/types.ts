import type { LoggingLevel } from '@modelcontextprotocol/sdk/types.js';

// Re-export so downstream modules don't need to import from the SDK directly
export type { LoggingLevel };

// ─── RFC 5424 Severity Ordering ───────────────────────────────────────────────

/** RFC 5424 syslog severity ordering (lower index = more severe). */
export const LOG_LEVEL_SEVERITY: Record<LoggingLevel, number> = {
  emergency: 0,
  alert: 1,
  critical: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

// ─── Standard Event Names ─────────────────────────────────────────────────────

/** Standard audit event names. Apps can extend with their own. */
export const StandardEventName = {
  TOOL_INVOKED: 'tool-invoked',
  TOOL_SUCCEEDED: 'tool-succeeded',
  TOOL_FAILED: 'tool-failed',
  RATELIMIT_EXCEEDED: 'ratelimit-exceeded',
  SERVER_STARTED: 'server-started',
  SERVER_ERROR: 'server-error',
} as const;

export type StandardEventName =
  (typeof StandardEventName)[keyof typeof StandardEventName];

// ─── Audit Event ──────────────────────────────────────────────────────────────

export interface AuditEventActor {
  actorId: string;
  actorType: 'service' | 'user';
  clientId: string;
}

export interface AuditEvent {
  eventName: string;
  namespace: string;
  timestamp: string;
  correlationId: string;
  toolName: string;
  /** Tool argument keys (values omitted by default for security). */
  args: Record<string, unknown>;
  result: 'success' | 'error';
  durationMs: number;
  actor?: AuditEventActor;
  metadata?: Record<string, unknown>;
}

// ─── Technical Log Entry ──────────────────────────────────────────────────────

export interface TechnicalLogEntry {
  level: LoggingLevel;
  timestamp: string;
  correlationId: string;
  component: string;
  message: string;
  payload?: Record<string, unknown>;
}

// ─── Emitter Interface ────────────────────────────────────────────────────────

/** Pluggable audit event emitter (console, ADSP Event Service, etc.). */
export interface AuditEmitter {
  emit(event: AuditEvent): Promise<void>;
  /** If true, this emitter is an ADSP service emitter and can be disabled via config. */
  readonly isADSP?: boolean;
}
