const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.status(200).json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  let passwordHash;
  if (password && password.length >= 3) {
    passwordHash = await bcrypt.hash(password, 10);
  } else {
    return response.status(400).json({
      error: "ValidationError",
      errorMessage:
        "User validation failed: Password must be provided and should be at least 3 characters long",
    });
  }

  const newUserObj = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await newUserObj.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
