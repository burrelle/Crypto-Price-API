import * as winston from "winston";

const err_logger: winston.Logger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: "error.log", level: "error"})
    ]
});

const info_logger: winston.Logger = winston.createLogger({
    level: "info",
    format: winston.format.simple(),
    transports: []
});

if (process.env.NODE_ENV !== "production") {
    err_logger.add(new winston.transports.Console({
      format: winston.format.json()
    }));
}

if (process.env.NODE_ENV !== "production") {
    info_logger.add(new winston.transports.Console({
      format: winston.format.printf(info => `${info.message}`)
    }));
}

export function logError(source: string, error: any): void {
    err_logger.log("error", source, error);
}

export function logInfo(info: string): void {
    info_logger.log("info", info);
}