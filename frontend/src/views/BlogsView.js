import BlogForm from "../components/BlogForm";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { blogsPageLayout } from "../styles/layoutStyles";
import Blog from "../components/Blog";

const BlogsView = () => {
  const blogFormRef = useRef("");
  const blogs = useSelector((state) => state.blogs);

  return (
    <div style={blogsPageLayout}>
      <BlogForm blogFormRef={blogFormRef} />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          id={blog.id}
          title={blog.title}
          addedBy={blog.user.name}
        />
      ))}
    </div>
  );
};

export default BlogsView;
