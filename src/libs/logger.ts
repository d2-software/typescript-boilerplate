import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { existsSync, mkdirSync } from 'fs';

export class Logger {
  logDir: string;
  environment: string;

  constructor(logDir, environment) {
    this.logDir = logDir;
    this.environment = environment;
  }

  async init() {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir);
    }

    this.create();
  }

  private create() {
    const dailyRotateFileTransport = new transports.DailyRotateFile({
      filename: `${this.logDir}/%DATE%-results.log`,
      datePattern: 'YYYY-MM-DD'
    });

    const logger = createLogger({
      level: this.environment === 'development' ? 'silly' : 'info',
      handleExceptions: true,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
      transports: [
        new transports.Console({
          level: 'info',
          handleExceptions: true,
          format: format.combine(
            format.colorize(),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
          )
        }),
        dailyRotateFileTransport
      ]
    });

    logger.stream({
      write: message => {
        logger.info(message);
      }
    });
  }
}
