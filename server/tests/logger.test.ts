import { describe, it, expect } from 'vitest';
import { logger } from '../src/utils/logger.js';

describe('Structured Logger Verification', () => {
  it('exposes all standard log methods safely without throwing', () => {
    expect(() => {
      logger.debug('Testing debug log level');
      logger.info('Testing info log level');
      logger.warn('Testing warn log level');
      logger.error('Testing error log level');
    }).not.toThrow();
  });

  it('safely formats complex metadata objects without circular reference crash', () => {
    const meta = {
      service: 'AirAware',
      timestamp: 123456789,
      metrics: { aqi: 185, pm25: 112 }
    };
    expect(() => {
      logger.info('Complex payload metadata', meta);
    }).not.toThrow();
  });

  it('serializes standard Error instances with stack traces without uncaught exception', () => {
    const testError = new Error('Simulated upstream environmental API timeout');
    expect(() => {
      logger.error('API failure caught by service resilience handler', testError);
    }).not.toThrow();
  });

  it('handles primitive metadata types (numbers, booleans, strings) cleanly', () => {
    expect(() => {
      logger.info('Primitive number meta', 42);
      logger.warn('Primitive boolean meta', true);
      logger.error('Primitive string meta', 'timeout');
    }).not.toThrow();
  });
});
