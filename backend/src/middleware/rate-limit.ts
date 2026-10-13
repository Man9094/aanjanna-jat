import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/AppError";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function rateLimit(options: {
  windowMs?: number;
  maxRequests?: number;
  message?: string;
} = {}) {
  const windowMs = options.windowMs ?? 15 * 60 * 1000; // default 15 minutes
  const maxRequests = options.maxRequests ?? 5; // default 5 attempts
  const message = options.message ?? "Too many requests. Please try again later.";

  return (req: Request, res: Response, next: NextFunction) => {
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown";

    const key = `${req.path}:${ip}`;
    const now = Date.now();

    // Clean up memory occasionally
    if (rateLimitMap.size > 10000) {
      for (const [k, v] of rateLimitMap.entries()) {
        if (v.resetTime <= now) rateLimitMap.delete(k);
      }
    }

    const record = rateLimitMap.get(key);

    if (!record || record.resetTime <= now) {
      rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfterSec = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader("Retry-After", String(retryAfterSec));
      return next(new AppError(message, 429));
    }

    record.count += 1;
    next();
  };
}

export function clearRateLimit(path: string, req: Request) {
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";
  rateLimitMap.delete(`${path}:${ip}`);
}
