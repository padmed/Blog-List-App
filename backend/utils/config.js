require("dotenv").config();

const mongoURL = process.env.MONGODB_URI;
const PORT = 3003;

module.exports = { mongoURL, PORT };
