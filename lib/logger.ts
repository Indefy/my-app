type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

const shouldLog = (level: keyof typeof logLevels) => {
  return logLevels[level] <= logLevels[LOG_LEVEL as keyof typeof logLevels];
};

const formatMessage = (level: string, message: string, meta?: any) => {
  const timestamp = new Date().toISOString();
  const metaString = meta ? `\n${JSON.stringify(meta, null, 2)}` : '';
  return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`;
};

class Logger {
  private static instance: Logger;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, meta?: any) {
    if (shouldLog(level)) {
      console[level](formatMessage(level, message, meta));
    }
  }

  debug(message: string, meta?: any) {
    this.log('debug', message, meta);
  }

  info(message: string, meta?: any) {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: any) {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: any) {
    this.log('error', message, meta);
  }
}

export const logger = Logger.getInstance();
