import { createLogger, format, Logger as WinstonLogger, transports } from 'winston';
import 'winston-daily-rotate-file';

export class Logger {
  logger: WinstonLogger;
  environment: string;

  constructor(environment?: string) {
    this.environment = environment ?? process.env.ENVIRONMENT;

    const dailyRotateFileTransport = new transports.DailyRotateFile({
      filename: `logs/%DATE%-results.log`,
      datePattern: 'YYYY-MM-DD'
    });

    this.logger = createLogger({
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
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }
}
