import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/index.js';
import { sanitizeString, isValidCoordinate, sanitizeNumber } from '../src/utils/sanitize.js';

describe('Security Headers & Hardening', () => {
  it('enforces Helmet security headers on all HTTP responses', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['cross-origin-resource-policy']).toBe('cross-origin');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });

  it('rejects out-of-bounds geographic coordinates', async () => {
    const res = await request(app).get('/api/air-quality?lat=999&lon=999');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('rejects non-numeric coordinates', async () => {
    const res = await request(app).get('/api/weather?lat=delhi&lon=invalid');
    expect(res.status).toBe(400);
  });

  it('rejects empty body on protected POST routes', async () => {
    const res = await request(app).post('/api/ai/chat').send({});
    expect(res.status).toBe(400);
  });
});

describe('Input Sanitization & Injection Defense', () => {
  it('strips script tags and malicious HTML injections from input strings', () => {
    const malicious = 'Hello <script>alert("xss")</script> world!';
    const sanitized = sanitizeString(malicious);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).not.toContain('alert("xss")');
    expect(sanitized).toBe('Hello  world!');
  });

  it('strips non-printable ASCII control characters to prevent prompt injection', () => {
    const controlChars = 'Smog\x00\x08\x1B\x7F Inversion Advisory';
    const sanitized = sanitizeString(controlChars);
    expect(sanitized).toBe('Smog Inversion Advisory');
  });

  it('enforces maximum character lengths to avoid token exhaustion attacks', () => {
    const longInput = 'A'.repeat(5000);
    const sanitized = sanitizeString(longInput, 500);
    expect(sanitized.length).toBe(500);
  });

  it('correctly validates geographical latitude and longitude bounds', () => {
    expect(isValidCoordinate(28.6139, 77.2090)).toBe(true);
    expect(isValidCoordinate(-33.8688, 151.2093)).toBe(true);
    expect(isValidCoordinate(91.0, 50.0)).toBe(false);
    expect(isValidCoordinate(45.0, 185.0)).toBe(false);
    expect(isValidCoordinate(NaN, 77.0)).toBe(false);
    expect(isValidCoordinate(null, 77.0)).toBe(false);
  });

  it('sanitizes and bounds numerical inputs within min/max thresholds', () => {
    expect(sanitizeNumber(25, 0, 100)).toBe(25);
    expect(sanitizeNumber(150, 0, 100)).toBe(100);
    expect(sanitizeNumber(-20, 0, 100)).toBe(0);
    expect(sanitizeNumber('42', 0, 100)).toBe(42);
    expect(sanitizeNumber('invalid', 0, 100, 10)).toBe(10);
  });
});
