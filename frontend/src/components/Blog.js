import { useState } from "react";

const Blog = ({ blog }) => {
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
  console.log(name);
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
          Likes {blog.likes} <button>Like</button>
        </div>
        <div>{name}</div>
      </div>
    </div>
  );
};

export default Blog;
