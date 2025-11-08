import winston from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize, align } = winston.format;

const consoleLogFormat = combine(
  colorize({ all: true }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  align(),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

const fileLogFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  align(),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  level: "info",
});

const errorFileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "30d",
  level: "error",
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [
    new winston.transports.Console({ format: consoleLogFormat }),
    fileRotateTransport,
    errorFileRotateTransport,
  ],
});

export default logger;