const User = require("../models/user");
const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

// Checks how API handler behaves when there's validation error
const testValidationOnFaulty = async (testProps) => {
  const usersAtStart = await usersInDb();

  const reqResult = await api
    .post(testProps.endpoint)
    .send(testProps.newUser)
    .expect(400);
  expect(reqResult.body.error).toBe("ValidationError");

  const usersAtEnd = await usersInDb();
  expect(usersAtEnd).toEqual(usersAtStart);

  return reqResult;
};

module.exports = { usersInDb, testValidationOnFaulty };
