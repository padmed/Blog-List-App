const app = require("../app");
const supertest = require("supertest");
const Blog = require("../models/blog");
const { initialBlogs, blogsInDb } = require("./list_api_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promisesArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promisesArray);
});

test("/api/blogs GET method works", async () => {
  const request = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(request.body).toHaveLength(initialBlogs.length);
});

test("id property is defined instead of _id", async () => {
  const blogs = await blogsInDb();
  blogs.forEach((blog) => {
    expect(blog).toHaveProperty("id");
    expect(blog).not.toHaveProperty("_id");
  });
});

test("blog is saved in the database", async () => {
  const newBlog = {
    title: "test",
    author: "Bob",
    url: "bob.com",
    likes: 0,
  };

  const reqResult = await api.post("/api/blogs").send(newBlog).expect(201);
  const blogsAtEnd = await blogsInDb();

  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
  expect(blogsAtEnd).toContainEqual(reqResult.body);
});

test("likes default value is 0", async () => {
  const newBlog = {
    title: "test",
    author: "Bob",
    url: "bob.com",
  };

  const reqResult = await api.post("/api/blogs").send(newBlog).expect(201);
  expect(reqResult.body).toHaveProperty("likes", 0);
});
