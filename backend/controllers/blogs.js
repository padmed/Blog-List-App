const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const newBlog = new Blog(request.body);
  const user = request.user;

  user.blogs = user.blogs.concat(newBlog.id);
  await user.save();

  newBlog.user = user.id;
  const blogSaved = await newBlog.save();

  response.status(201).json(blogSaved);
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const blogId = request.params.id;
  const user = request.user;
  const blogToDelete = await Blog.findById(blogId);
  if (!blogToDelete) {
    return response.status(404).end();
  }

  if (user && blogToDelete.user.toString() === user.id) {
    await Blog.findByIdAndDelete(blogId);
    const updatedBlogs = user.blogs.filter(
      (blog) => blog.toString() !== blogToDelete.id
    );
    user.blogs = updatedBlogs;
    user.save();
  } else {
    response.status(401).json({
      error: "Invalid Token",
      message: "Blog cannot be deleted because of invalid token",
    });
  }

  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const { id } = request.params;

  const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogRouter;
