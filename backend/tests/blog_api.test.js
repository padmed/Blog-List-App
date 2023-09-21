const app = require("../app");
const supertest = require("supertest");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  getToken,
} = require("./helper");

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
  beforeAll(async () => {
    await User.deleteMany({});

    const userForTest = new User({
      username: "testPost",
      name: "requestTester",
      passwordHash: await bcrypt.hash("testPost", 10),
    });

    await userForTest.save();
  });

  test("Blog is saved in the database", async () => {
    const tokenObj = await getToken({
      username: "testPost",
      password: "testPost",
    });

    const newBlog = {
      title: "test",
      author: "Bob",
      url: "bob.com",
      likes: 0,
    };

    const reqResult = await api
      .post("/api/blogs")
      .set("Authorization", tokenObj.token)
      .send(newBlog)
      .expect(201);

    reqResult.body.user = new mongoose.Types.ObjectId(reqResult.body.user);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
    expect(blogsAtEnd).toContainEqual(reqResult.body);
  });

  test("Blog is not saved in the database without a token", async () => {
    const newBlog = {
      title: "test",
      author: "Bob",
      url: "bob.com",
      likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test("Adding a blog without likes, sets value of likes to 0", async () => {
    const tokenObj = await getToken({
      username: "testPost",
      password: "testPost",
    });

    const newBlog = {
      title: "test",
      author: "Bob",
      url: "bob.com",
    };

    const reqResult = await api
      .post("/api/blogs")
      .set("Authorization", tokenObj.token)
      .send(newBlog)
      .expect(201);
    expect(reqResult.body).toHaveProperty("likes", 0);
  });

  test("Missing URL field returns 400", async () => {
    const tokenObj = await getToken({
      username: "testPost",
      password: "testPost",
    });

    const newBlog = {
      title: "test",
      author: "Bob",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", tokenObj.token)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test("Missing Title field returns 400", async () => {
    const tokenObj = await getToken({
      username: "testPost",
      password: "testPost",
    });

    const newBlog = {
      author: "Bob",
      url: "bob.com",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", tokenObj.token)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  describe("Comment tests", () => {
    test("comments list is initialised in db", async () => {
      const blogs = await blogsInDb();
      const blog = blogs[0];
      expect(blog).toHaveProperty("comments");
    });

    test("Adding comment", async () => {
      const blogs = await blogsInDb();
      const blogToUpdate = blogs[0].id;

      const updatedComments = await api
        .post(`/api/blogs/${blogToUpdate}/comments`)
        .send({ comment: "hola" })
        .expect(201);

      expect(updatedComments.body.comments).toEqual(["hola"]);
    });
  });
});

describe("DELETE request tests", () => {
  beforeAll(async () => {
    await User.deleteMany({});

    const userForTest = new User({
      username: "testDelete",
      name: "requestTester",
      passwordHash: await bcrypt.hash("testDelete", 10),
    });

    const userForTest2 = new User({
      username: "testDelete2",
      name: "requestTester2",
      passwordHash: await bcrypt.hash("testDelete2", 10),
    });

    await userForTest.save();
    await userForTest2.save();
  });

  beforeEach(async () => {
    await Blog.deleteOne({ username: "testDelete" });
    const tokenObj = await getToken({
      username: "testDelete",
      password: "testDelete",
    });

    const blogForTest = {
      title: "testDelete",
      author: "testDelete",
      url: "testDelete",
      likes: 0,
    };

    await api
      .post("/api/blogs/")
      .set("Authorization", tokenObj.token)
      .send(blogForTest);
  });

  test("DELETE method works", async () => {
    const blogs = await blogsInDb();
    const blogToDelete = blogs[2]; // Last added blog is the one to delete
    const tokenObj = await getToken({
      username: "testDelete",
      password: "testDelete",
    });

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", tokenObj.token)
      .expect(204);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
    expect(blogsAtEnd).not.toContainEqual(blogToDelete);
  });

  test("DELETE method doesn't work without a token", async () => {
    const blogs = await blogsInDb();
    const blogToDelete = blogs[2]; // Last added blog is the one to delete

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
    expect(blogsAtEnd).toContainEqual(blogToDelete);
  });

  test("Deleting someoene else's blog returns 401", async () => {
    const firstPerson = await getToken({
      username: "testDelete",
      password: "testDelete",
    });

    const secondPerson = await getToken({
      username: "testDelete2",
      password: "testDelete2",
    });

    const blogToAdd = {
      title: "test",
      author: "Bob",
      url: "bob.com",
      likes: 0,
    };

    const reqResult = await api
      .post("/api/blogs")
      .set("Authorization", firstPerson.token)
      .send(blogToAdd);

    const blogToDelete = reqResult.body.id;

    await api
      .delete(`/api/blogs/${blogToDelete}`)
      .set("Authorization", secondPerson.token)
      .expect(401);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 2);
  });

  test("Deleting non-existing blog returns 404", async () => {
    const tokenObj = await getToken({
      username: "testDelete",
      password: "testDelete",
    });

    const id = await nonExistingId();
    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", tokenObj.token)
      .expect(404);
  });

  test("Deleting a blog with malformated id returns 400", async () => {
    const tokenObj = await getToken({
      username: "testDelete",
      password: "testDelete",
    });

    const blogs = await Blog.find({});
    const malformatedId = blogs[0].id + "urlBraker";

    await api
      .delete(`/api/blogs/${malformatedId}`)
      .set("Authorization", tokenObj.token)
      .expect(400);
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
      comments: [],
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
