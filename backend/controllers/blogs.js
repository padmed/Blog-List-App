const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

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

blogRouter.post("/", async (request, response) => {
  const newBlog = new Blog(request.body);
  const users = await User.find({});

  if (users.length < 1) {
    return response.status(400).json({
      error: "No user in db",
    });
  }

  const user = users[0];

  user.blogs = user.blogs.concat(newBlog.id);
  await user.save();

  newBlog.user = user.id;
  const blogSaved = await newBlog.save();
  response.status(201).json(blogSaved);
});

blogRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  await Blog.findByIdAndRemove(id);
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
