import { RateLimiter } from './rate-limiter';

describe('RateLimiter', () => {
  it('should allow calls within the limit', () => {
    const limiter = new RateLimiter(5);
    expect(() => {
      for (let i = 0; i < 5; i++) {
        limiter.check();
      }
    }).not.toThrow();
  });

  it('should throw when limit is exceeded', () => {
    const limiter = new RateLimiter(3);
    limiter.check();
    limiter.check();
    limiter.check();
    expect(() => limiter.check()).toThrow('Rate limit exceeded');
  });

  it('should reset timestamps', () => {
    const limiter = new RateLimiter(2);
    limiter.check();
    limiter.check();
    expect(() => limiter.check()).toThrow();
    limiter.reset();
    expect(() => limiter.check()).not.toThrow();
  });

  it('should respect the sliding window', () => {
    const limiter = new RateLimiter(2, 100);
    limiter.check();
    limiter.check();
    expect(() => limiter.check()).toThrow();

    // Fast-forward time by modifying Date.now
    const realNow = Date.now;
    Date.now = () => realNow() + 150;
    try {
      expect(() => limiter.check()).not.toThrow();
    } finally {
      Date.now = realNow;
    }
  });

  it('should default to 60 calls per minute', () => {
    const limiter = new RateLimiter();
    expect(() => {
      for (let i = 0; i < 60; i++) {
        limiter.check();
      }
    }).not.toThrow();
    expect(() => limiter.check()).toThrow('Rate limit exceeded');
  });

  it('should enforce minimum limit of 1', () => {
    const limiter = new RateLimiter(0);
    expect(() => limiter.check()).not.toThrow();
    expect(() => limiter.check()).toThrow();
  });

  it('should update limit via setLimit()', () => {
    const limiter = new RateLimiter(2);
    limiter.check();
    limiter.check();
    expect(() => limiter.check()).toThrow();
    limiter.setLimit(5);
    expect(() => limiter.check()).not.toThrow();
  });

  it('setLimit should enforce minimum of 1', () => {
    const limiter = new RateLimiter(10);
    limiter.setLimit(0);
    expect(() => limiter.check()).not.toThrow();
    expect(() => limiter.check()).toThrow();
  });
});
