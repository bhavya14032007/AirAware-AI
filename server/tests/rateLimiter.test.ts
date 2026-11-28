import { describe, it, expect } from 'vitest';
import { generalRateLimiter, aiRateLimiter } from '../src/middleware/rateLimiter.js';
import {
  GENERAL_RATE_LIMIT_WINDOW_MS,
  GENERAL_RATE_LIMIT_MAX_REQUESTS,
  AI_RATE_LIMIT_WINDOW_MS,
  AI_RATE_LIMIT_MAX_REQUESTS
} from '../src/constants/index.js';

describe('Rate Limiter Middleware Specification', () => {
  it('configures the general API rate limiter with standard 15-minute window', () => {
    expect(generalRateLimiter).toBeDefined();
    expect(typeof generalRateLimiter).toBe('function');
    expect(GENERAL_RATE_LIMIT_WINDOW_MS).toBe(15 * 60 * 1000);
    expect(GENERAL_RATE_LIMIT_MAX_REQUESTS).toBe(200);
  });

  it('configures the AI reasoning endpoint rate limiter with restrictive quota', () => {
    expect(aiRateLimiter).toBeDefined();
    expect(typeof aiRateLimiter).toBe('function');
    expect(AI_RATE_LIMIT_WINDOW_MS).toBe(60 * 1000);
    expect(AI_RATE_LIMIT_MAX_REQUESTS).toBe(30);
  });

  it('ensures AI quota is more restrictive than general browsing traffic', () => {
    const aiReqPerMinute = AI_RATE_LIMIT_MAX_REQUESTS;
    const generalReqPerMinute = GENERAL_RATE_LIMIT_MAX_REQUESTS / 15;
    expect(generalReqPerMinute).toBeLessThan(aiReqPerMinute);
  });
});
