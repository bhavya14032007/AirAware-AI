/**
 * AirAware AI — Security & Input Sanitization Utilities
 * Provides defense-in-depth sanitization, boundary checking, and XSS/Injection defenses.
 */

/**
 * Validates geographical latitude and longitude coordinates.
 */
export function isValidCoordinate(lat: unknown, lon: unknown): boolean {
  if (typeof lat !== 'number' || typeof lon !== 'number') return false;
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return false;
  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
}

/**
 * Sanitizes user-supplied string inputs to prevent prompt injection and control character abuse.
 * Strips dangerous control characters and limits length.
 */
export function sanitizeString(input: unknown, maxLength: number = 2000): string {
  if (typeof input !== 'string') return '';
  
  // Normalize Unicode and remove non-printable ASCII control characters except newlines/tabs
  const cleaned = input
    .normalize('NFKC')
    // Remove control characters (0x00-0x08, 0x0B-0x0C, 0x0E-0x1F, 0x7F)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Remove dangerous script injection markers if attempted
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .trim();

  return cleaned.slice(0, maxLength);
}

/**
 * Safely parses and bounds numerical inputs.
 */
export function sanitizeNumber(val: unknown, min: number = 0, max: number = 1000000, fallback: number = 0): number {
  if (typeof val === 'number' && Number.isFinite(val)) {
    return Math.min(Math.max(val, min), max);
  }
  if (typeof val === 'string') {
    const parsed = parseFloat(val);
    if (Number.isFinite(parsed)) {
      return Math.min(Math.max(parsed, min), max);
    }
  }
  return fallback;
}
