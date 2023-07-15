require("dotenv").config();

const mongoURL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const PORT = 3003;

module.exports = { mongoURL, PORT };
