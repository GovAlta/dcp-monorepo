const DEFAULT_RATE_LIMIT = 60;
const RATE_WINDOW_MS = 60_000;

export class RateLimiter {
  private limit: number;
  private readonly windowMs: number;
  private readonly timestamps: number[] = [];

  constructor(limit?: number, windowMs?: number) {
    this.limit = Math.max(
      1,
      limit ??
        (parseInt(process.env['GOA_RATE_LIMIT'] ?? '', 10) ||
          DEFAULT_RATE_LIMIT),
    );
    this.windowMs = windowMs ?? RATE_WINDOW_MS;
  }

  /** Update the rate limit at runtime. */
  setLimit(limit: number): void {
    this.limit = Math.max(1, Math.floor(limit));
  }

  check(): void {
    const now = Date.now();
    while (
      this.timestamps.length > 0 &&
      (this.timestamps[0] as number) <= now - this.windowMs
    ) {
      this.timestamps.shift();
    }
    if (this.timestamps.length >= this.limit) {
      throw new Error(
        `Rate limit exceeded. Maximum ${this.limit} tool calls per minute.`,
      );
    }
    this.timestamps.push(now);
  }

  reset(): void {
    this.timestamps.length = 0;
  }
}

/**
 * A keyed rate limiter that maintains a separate sliding window per key (e.g. session ID, IP).
 * Idle keys are cleaned up automatically.
 */
export class KeyedRateLimiter {
  private limit: number;
  private readonly windowMs: number;
  private readonly buckets = new Map<string, number[]>();

  constructor(limit?: number, windowMs?: number) {
    this.limit = Math.max(
      1,
      limit ??
        (parseInt(process.env['GOA_RATE_LIMIT'] ?? '', 10) ||
          DEFAULT_RATE_LIMIT),
    );
    this.windowMs = windowMs ?? RATE_WINDOW_MS;
  }

  /** Update the rate limit at runtime. */
  setLimit(limit: number): void {
    this.limit = Math.max(1, Math.floor(limit));
  }

  check(key: string): void {
    const now = Date.now();
    let timestamps = this.buckets.get(key);
    if (!timestamps) {
      timestamps = [];
      this.buckets.set(key, timestamps);
    }

    while (
      timestamps.length > 0 &&
      (timestamps[0] as number) <= now - this.windowMs
    ) {
      timestamps.shift();
    }
    if (timestamps.length >= this.limit) {
      throw new Error(
        `Rate limit exceeded. Maximum ${this.limit} tool calls per minute.`,
      );
    }
    timestamps.push(now);
  }

  remove(key: string): void {
    this.buckets.delete(key);
  }
}
