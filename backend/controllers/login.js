const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const user = await User.findOne({ username });

  console.log(username, password);
  const passwordCorrect = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);

    console.log('passwordCorrect', passwordCorrect);

  if (!user || !passwordCorrect) {
    return response.status(401).json({
      error: "incorrect username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  console.log('userfortoken', userForToken);
  const token = jwt.sign(userForToken, process.env.SECRET);

  console.log('token', token);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id });
});

module.exports = loginRouter;
