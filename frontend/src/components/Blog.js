import { useState } from "react";
// Take the blog variable out in the App and handle like increase in app component!!!
const Blog = ({ blog, updateBlog }) => {
  const [isHidden, setIsHidden] = useState(false);
  const toggleVisibility = () => setIsHidden(!isHidden);

  const blogStyle = {
    border: "3px solid grey",
    padding: "10px",
    margin: "10px",
  };

  const forBlog = { ...blogStyle, display: isHidden ? "" : "none" };
  const forCompleteBlog = { ...blogStyle, display: isHidden ? "none" : "" };

  const name = blog.user.name ? blog.user.name : blog.temporaryName;
  const id = blog.user.id ? blog.user.id : blog.user;

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: id };
    updateBlog(updatedBlog);
  };

  return (
    <div>
      <div style={forBlog}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={forCompleteBlog}>
        <div>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleVisibility}>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          Likes {blog.likes} <button onClick={handleLike}>Like</button>
        </div>
        <div>{name}</div>
      </div>
    </div>
  );
};

export default Blog;
