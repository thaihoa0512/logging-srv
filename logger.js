const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
//const fs = require('fs');
//const path = require('path');
require('dotenv').config();
//const PORT = process.env.PORT || "5555";
const logDir =  process.env.LOG_DIR ||'./log';

const dailyRotateFileTransport = filename => new transports.DailyRotateFile({
  filename: `${logDir}/${filename}-%DATE%.log`,
  maxSize: "1g",
  maxDays: "3d",
  zippedArchive: true,
  datePattern: 'YYYY-MM-DD'
});

const logger = function(filename){
    console.log("logger call");
  return createLogger({
    // change level if in dev environment versus production
    level: 'debug', 
    maxsize: '500m',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      // for the log file
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
      new transports.Console({
        level: 'info',
        format: format.combine(
          format.colorize(),
          format.printf(
            info => `${info.message}`
          )
        )
      }),
      
      dailyRotateFileTransport(filename)
    ]
  });
  console.log("logger call end");
}

module.exports = logger // is now a function