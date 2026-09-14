// RateLimiter + RetryPolicy — jedno miejsce na delay i 429 + whiteRatio
export class RateLimiter {
  constructor(private delayMs = 1200, private backoffMs = 10000) {}
  async wait() {
    await new Promise((r) => setTimeout(r, this.delayMs));
  }
  async backoff() {
    await new Promise((r) => setTimeout(r, this.backoffMs));
  }
}

export type RetryOpts = { maxRetries?: number; shouldRetry?: (err: string) => boolean };

export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOpts = {}): Promise<T> {
  const max = opts.maxRetries ?? 2;
  let last: unknown;
  for (let i = 0; i <= max; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      const msg = String(e);
      const retry = opts.shouldRetry ? opts.shouldRetry(msg) : msg.includes("429") || msg.includes("503") || msg.includes("loading");
      if (!retry || i === max) throw e;
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
  throw last;
}
