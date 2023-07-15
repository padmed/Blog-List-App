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
