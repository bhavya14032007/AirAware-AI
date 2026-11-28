/**
 * AirAware AI — Client-side Safe Logger
 * Suppresses debug and warn spam in production environments.
 */

const isDev = Boolean(import.meta.env?.DEV);

export const clientLogger = {
  info: (message: string, ...args: unknown[]): void => {
    if (isDev) {
      console.info(`[AirAware Client] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]): void => {
    if (isDev) {
      console.warn(`[AirAware Client] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: unknown[]): void => {
    console.error(`[AirAware Client] ${message}`, ...args);
  }
};
