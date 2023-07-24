const User = require("../models/user");
const Blog = require("../models/blog");
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

const getToken = async (testProps) => {
  const username = testProps.username;
  const password = testProps.password;

  const reqResult = await api.post("/api/login").send({ username, password });
  const tokenObj = reqResult.body;
  tokenObj.token = `bearer ${tokenObj.token}`;

  return tokenObj;
};

const initialBlogs = [
  {
    title: "blog 1",
    author: "Bob",
    url: "bob.com",
    likes: 0,
  },
  {
    title: "blog 2",
    author: "Bob",
    url: "bob.com",
    likes: 0,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "dudu's blog",
    author: "Bob",
    url: "bob.com",
    likes: 1232,
  });

  const blogSaved = await blog.save();
  const id = blogSaved.id;
  await Blog.findByIdAndRemove(id);

  return id;
};

module.exports = {
  usersInDb,
  testValidationOnFaulty,
  getToken,
  nonExistingId,
  blogsInDb,
  initialBlogs,
};
