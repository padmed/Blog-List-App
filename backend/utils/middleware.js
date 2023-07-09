const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  logger.error("--------------");
  logger.error(`Error name: ${error.name}`);
  logger.error(`Error message: ${error.message}`);
  logger.error("--------------");

  if (error.name === "ValidationError") {
    return response.status(422).json({
      error: error.name,
      errorMessage: error.message,
    });
  }

  return response.status(400).json({
    error: error.name,
    errorMessage: error.message,
  });
};

const requestLogger = (request, response, next) => {
  logger.info("--------------");
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("--------------");
  next();
};

const unknownEndpoint = (request, response, next) => {
  response.status(404).json({
    error: "Unknown endpoint",
  });
  next();
};

module.exports = { errorHandler, requestLogger, unknownEndpoint };
