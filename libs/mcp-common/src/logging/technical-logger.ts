import type { LoggingLevel, TechnicalLogEntry } from './types';
import { LOG_LEVEL_SEVERITY } from './types';

// ─── Configuration ────────────────────────────────────────────────────────────

const DEFAULT_LEVEL: LoggingLevel = 'info';

function resolveMinLevel(): LoggingLevel {
  const env = process.env['GOA_LOG_LEVEL'];
  if (env && env in LOG_LEVEL_SEVERITY) return env as LoggingLevel;
  return DEFAULT_LEVEL;
}

// ─── Logger ───────────────────────────────────────────────────────────────────

/**
 * Structured JSON logger that writes one NDJSON line per entry to stderr.
 *
 * Stderr is used because:
 *  - MCP stdio transport reserves stdout for JSON-RPC messages
 *  - NDJSON on stderr is directly ingestible by Splunk/SIEM
 */
export class StructuredJsonLogger {
  private minSeverity: number;

  constructor(minLevel?: LoggingLevel) {
    this.minSeverity = LOG_LEVEL_SEVERITY[minLevel ?? resolveMinLevel()];
  }

  /** Update the minimum log level at runtime. */
  setMinLevel(level: LoggingLevel): void {
    this.minSeverity = LOG_LEVEL_SEVERITY[level];
  }

  /** Returns true if a message at `level` would be emitted. */
  isEnabled(level: LoggingLevel): boolean {
    return LOG_LEVEL_SEVERITY[level] <= this.minSeverity;
  }

  /** Write a structured log entry to stderr if it meets the minimum level. */
  log(entry: TechnicalLogEntry): void {
    if (!this.isEnabled(entry.level)) return;
    process.stderr.write(JSON.stringify(entry) + '\n');
  }

  /** Convenience: build and write a log entry. */
  write(
    level: LoggingLevel,
    component: string,
    message: string,
    correlationId: string,
    payload?: Record<string, unknown>,
  ): void {
    this.log({
      level,
      timestamp: new Date().toISOString(),
      correlationId,
      component,
      message,
      ...(payload !== undefined ? { payload } : {}),
    });
  }

  // ── Convenience short-hands ─────────────────────────────────────────

  debug(
    component: string,
    message: string,
    correlationId = '',
    payload?: Record<string, unknown>,
  ): void {
    this.write('debug', component, message, correlationId, payload);
  }

  info(
    component: string,
    message: string,
    correlationId = '',
    payload?: Record<string, unknown>,
  ): void {
    this.write('info', component, message, correlationId, payload);
  }

  notice(
    component: string,
    message: string,
    correlationId = '',
    payload?: Record<string, unknown>,
  ): void {
    this.write('notice', component, message, correlationId, payload);
  }

  warning(
    component: string,
    message: string,
    correlationId = '',
    payload?: Record<string, unknown>,
  ): void {
    this.write('warning', component, message, correlationId, payload);
  }

  error(
    component: string,
    message: string,
    correlationId = '',
    payload?: Record<string, unknown>,
  ): void {
    this.write('error', component, message, correlationId, payload);
  }

  critical(
    component: string,
    message: string,
    correlationId = '',
    payload?: Record<string, unknown>,
  ): void {
    this.write('critical', component, message, correlationId, payload);
  }

  alert(
    component: string,
    message: string,
    correlationId = '',
    payload?: Record<string, unknown>,
  ): void {
    this.write('alert', component, message, correlationId, payload);
  }

  emergency(
    component: string,
    message: string,
    correlationId = '',
    payload?: Record<string, unknown>,
  ): void {
    this.write('emergency', component, message, correlationId, payload);
  }
}
