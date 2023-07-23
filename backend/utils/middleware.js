const { request, response } = require("express");
const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
  logger.error("--------------");
  logger.error(`Error name: ${error.name}`);
  logger.error(`Error message: ${error.message}`);
  logger.error("--------------");

  if (error.name === "ValidationError") {
    return response.status(400).json({
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

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("bearer")) {
    const token = authorization.replace("bearer ", "");
    request.token = token;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const user = decodedToken
    ? await User.findOne({ username: decodedToken.username })
    : null;

  request.user = user;
  next();
};

module.exports = {
  errorHandler,
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
