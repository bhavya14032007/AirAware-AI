/**
 * AirAware AI — Structured Enterprise Logger
 * Provides leveled, timestamped, formatted logging and suppresses noisy logs in test environments.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

class Logger {
  private minLevel: LogLevel;
  private isTest: boolean;

  constructor() {
    this.isTest = process.env.NODE_ENV === 'test';
    this.minLevel = (process.env.LOG_LEVEL as LogLevel) || (this.isTest ? 'error' : 'info');
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.minLevel];
  }

  private format(level: LogLevel, message: string, meta?: unknown): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}] [AirAware]`;
    if (meta !== undefined) {
      const metaStr = typeof meta === 'object' ? JSON.stringify(meta) : String(meta);
      return `${prefix} ${message} - ${metaStr}`;
    }
    return `${prefix} ${message}`;
  }

  public debug(message: string, meta?: unknown): void {
    if (this.shouldLog('debug')) {
      console.debug(this.format('debug', message, meta));
    }
  }

  public info(message: string, meta?: unknown): void {
    if (this.shouldLog('info')) {
      console.log(this.format('info', message, meta));
    }
  }

  public warn(message: string, meta?: unknown): void {
    if (this.shouldLog('warn')) {
      console.warn(this.format('warn', message, meta));
    }
  }

  public error(message: string, errorOrMeta?: unknown): void {
    if (this.shouldLog('error')) {
      if (errorOrMeta instanceof Error) {
        console.error(this.format('error', message, {
          name: errorOrMeta.name,
          message: errorOrMeta.message,
          stack: errorOrMeta.stack
        }));
      } else {
        console.error(this.format('error', message, errorOrMeta));
      }
    }
  }
}

export const logger = new Logger();
