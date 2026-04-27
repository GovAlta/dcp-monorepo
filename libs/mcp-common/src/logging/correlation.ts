import { randomUUID } from 'node:crypto';

/**
 * Generate a new correlation ID, or inherit one from context.
 *
 * Priority:
 *  1. Explicitly provided `externalId` (e.g. from auth context tokenId)
 *  2. `GOA_CORRELATION_ID` environment variable (pipeline integration)
 *  3. Fresh UUID v4
 */
export function createCorrelationId(externalId?: string): string {
  return externalId || process.env['GOA_CORRELATION_ID'] || randomUUID();
}
