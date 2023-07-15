const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");

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
  initialBlogs,
  blogsInDb,
  nonExistingId,
};
