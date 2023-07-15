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

module.exports = {
  initialBlogs,
  blogsInDb,
};
