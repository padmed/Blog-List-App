const noteRouter = require("express").Router();
const Blog = require("../models/blog");

noteRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

noteRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = noteRouter;
