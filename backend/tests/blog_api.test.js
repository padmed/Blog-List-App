const app = require("../app");
const supertest = require("supertest");
const Blog = require("../models/blog");
const { initialBlogs, blogsInDb, nonExistingId } = require("./list_api_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promisesArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promisesArray);
});

describe("Initial tests", () => {
  test("/api/blogs GET method works", async () => {
    const request = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(request.body).toHaveLength(initialBlogs.length);
  });

  test("Id property is defined instead of _id", async () => {
    const blogs = await blogsInDb();
    blogs.forEach((blog) => {
      expect(blog).toHaveProperty("id");
      expect(blog).not.toHaveProperty("_id");
    });
  });
});

describe("Viewing a specific blog", () => {
  test("A blog can be viewed", async () => {
    const blogs = await blogsInDb();
    const blogToView = blogs[0];

    const requestResult = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(requestResult.body).toEqual(blogToView);
  });

  test("Non-existing blog URL returns 404", async () => {
    const id = await nonExistingId();
    await api.get(`/api/blogs/${id}`).expect(404);
  });

  test("Malformated id returns 400", async () => {
    const blogs = await Blog.find({});
    const malformatedId = blogs[0].id + "urlBraker";

    api.get(`/api/blogs/${malformatedId}`).expect(400);
  });
});

describe("POST request tests", () => {
  test("Blog is saved in the database", async () => {
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

  test("Adding a blog without likes, sets value of likes to 0", async () => {
    const newBlog = {
      title: "test",
      author: "Bob",
      url: "bob.com",
    };

    const reqResult = await api.post("/api/blogs").send(newBlog).expect(201);
    expect(reqResult.body).toHaveProperty("likes", 0);
  });

  test("Missing URL field returns 400", async () => {
    const newBlog = {
      title: "test",
      author: "Bob",
      likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test("Missing Title field returns 400", async () => {
    const newBlog = {
      author: "Bob",
      url: "bob.com",
      likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe("DELETE request tests", () => {
  test("DELETE method works", async () => {
    const blogs = await blogsInDb();
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
    expect(blogsAtEnd).not.toContainEqual(blogToDelete);
  });

  test("Deleting non-existing blog returns 204 as well", async () => {
    const id = await nonExistingId();
    await api.delete(`/api/blogs/${id}`).expect(204);
  });

  test("Deleting a blog with malformated id returns 400", async () => {
    const blogs = await Blog.find({});
    const malformatedId = blogs[0].id + "urlBraker";

    api.delete(`/api/blogs/${malformatedId}`).expect(400);
  });
});

describe("PUT request tests", () => {
  test("Updating a blog works", async () => {
    const blogs = await blogsInDb();
    const blogToUpdate = blogs[0];
    const newBlog = {
      title: "test blog",
      author: "test",
      url: "test.com",
      likes: 0,
    };

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    delete updatedBlog.body.id;
    expect(updatedBlog.body).toEqual(newBlog);
    expect(blogs.length).toBe(initialBlogs.length);
  });

  test("Setting title to empty string returns 400", async () => {
    const blogs = await blogsInDb();
    const blogToUpdate = blogs[0];
    const newBlog = {
      title: "",
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(400);
  });

  test("Setting URL to empty string returns 400", async () => {
    const blogs = await blogsInDb();
    const blogToUpdate = blogs[0];
    const newBlog = {
      url: "",
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(400);
  });

  test("Updating non-existing blog returns 404", async () => {
    const id = await nonExistingId();
    const newBlog = {
      title: "test blog",
      author: "test",
      url: "test.com",
      likes: 0,
    };

    await api.put(`/api/blogs/${id}`).send(newBlog).expect(404);
  });

  test("Updating a blog with malformated id returns 400", async () => {
    const blogs = await blogsInDb();
    const malformatedId = blogs[0].id + "idBraker";
    const newBlog = {
      title: "test blog",
      author: "test",
      url: "test.com",
      likes: 0,
    };

    await api.put(`/api/blogs/${malformatedId}`).send(newBlog).expect(400);
  });
});
