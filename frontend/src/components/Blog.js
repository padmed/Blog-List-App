import { useState } from "react";
// Take the blog variable out in the App and handle like increase in app component!!!
const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  const [isHidden, setIsHidden] = useState(false);
  const toggleVisibility = () => setIsHidden(!isHidden);
  const blogCreatedBy = blog.user;
  const loggedUser = user;

  const blogStyle = {
    border: "3px solid grey",
    padding: "10px",
    margin: "10px",
  };

  const forBlog = { ...blogStyle, display: isHidden ? "" : "none" };
  const forCompleteBlog = { ...blogStyle, display: isHidden ? "none" : "" };

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blogCreatedBy.id,
    };
    updateBlog(updatedBlog);
  };

  const handleDelete = () => {
    removeBlog(blog);
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
        <div>{blog.user.name}</div>
        <div>
          {blogCreatedBy.username === loggedUser.username && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
