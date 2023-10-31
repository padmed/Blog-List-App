import BlogForm from "../components/BlogForm";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { blogsPageLayout } from "../styles/layoutStyles";

const BlogsView = () => {
  const blogFormRef = useRef("");
  const blogs = useSelector((state) => state.blogs);

  const blogStyle = {
    width: "100%",
    fontSize: "25px",
    border: "2px solid black",
    margin: "15px",
    padding: "5px",
  };

  return (
    <div style={blogsPageLayout}>
      <BlogForm blogFormRef={blogFormRef} />
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogsView;
