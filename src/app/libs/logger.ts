import * as winston from "winston";
import DailyRotateFile, { DailyRotateFileTransportOptions } from "winston-daily-rotate-file";

export class Logger {

    public logger: winston.Logger;
    constructor() {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console()
            ]
        });
        this.configureLogger();
    }

    configureLogger() {
        let rotationOpts: DailyRotateFileTransportOptions = {
            filename: 'tm-bff-%DATE%.log',
            dirname: 'logs/',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        };
        this.logger.configure({
            level: 'verbose',
            transports: [
                new DailyRotateFile(rotationOpts)
            ]
        });
    }
}

export default (new Logger()).logger;