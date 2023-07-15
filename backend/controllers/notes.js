const noteRouter = require("express").Router();
const Blog = require("../models/blog");

noteRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

noteRouter.post("/", async (request, response, next) => {
  const newBlog = new Blog(request.body);
  const blogSaved = await newBlog.save();

  response.status(201).json(blogSaved);
});

module.exports = noteRouter;
