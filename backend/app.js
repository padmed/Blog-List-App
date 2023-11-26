require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { mongoURL } = require("./utils/config");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const testingRouter = require("./controllers/testMode");
const {
  errorHandler,
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
} = require("./utils/middleware");

logger.info("Connecting to MongoDB");
mongoose
  .connect(mongoURL)
  .then(() => {
    logger.info("Successfully connected to MongoDB");
  })
  .catch((e) => {
    logger.error(`Cannot connect to MongoDB: ${e.message}`);
  });

  app.use(cors()); 
  app.use(express.json());
  app.use(requestLogger);
  app.use(tokenExtractor);
  app.use(express.static('build'))

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
