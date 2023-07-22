const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const { usersInDb, testValidationOnFaulty } = require("./helper");

describe("When there's initially one user", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("tester", 10);

    const newUser = new User({
      name: "tester",
      username: "tester",
      passwordHash,
    });

    await newUser.save();
  });

  test("GET method works", async () => {
    const reqResult = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(reqResult.body).toHaveLength(1);
  });

  test("POST method works", async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      name: "user1",
      username: "user1",
      password: "guess",
    };

    const reqResult = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(usersAtEnd).toContainEqual(
      expect.objectContaining({ username: reqResult.body.username })
    );
  });

  test("POST fails if there's matching username in database", async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      name: "user",
      username: "tester",
      password: "guess",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe("Invalid users are not created", () => {
  test("User without the username is not created", async () => {
    const newUser = {
      name: "user",
      password: "guess",
    };

    const reqResult = await testValidationOnFaulty({
      newUser: newUser,
      endpoint: "/api/users",
    });

    expect(reqResult.body.errorMessage).toBe(
      "User validation failed: username: Path `username` is required."
    );
  });

  test("User without the password is not created", async () => {
    const newUser = {
      name: "user",
      username: "tester",
    };

    const reqResult = await testValidationOnFaulty({
      newUser: newUser,
      endpoint: "/api/users",
    });

    expect(reqResult.body.errorMessage).toBe(
      "User validation failed: Password must be provided and must be at least 3 characters long"
    );
  });

  test("User with the 2 characters long username is not added", async () => {
    const newUser = {
      name: "user",
      username: "te",
      password: "guess",
    };

    const reqResult = await testValidationOnFaulty({
      newUser: newUser,
      endpoint: "/api/users",
    });

    expect(reqResult.body.errorMessage).toMatch(
      "is shorter than the minimum allowed length (3)."
    );
  });

  test("User with 2 characters long password is not created", async () => {
    const newUser = {
      name: "user",
      username: "tester",
      password: "gu",
    };

    const reqResult = await testValidationOnFaulty({
      newUser: newUser,
      endpoint: "/api/users",
    });
    expect(reqResult.body.errorMessage).toBe(
      "User validation failed: Password must be provided and must be at least 3 characters long"
    );
  });
});
