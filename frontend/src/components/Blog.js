/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import { useState } from "react";
import PropTypes from "prop-types";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

function Blog({ blog, user }) {
  const [isHidden, setIsHidden] = useState(true);
  const toggleVisibility = () => setIsHidden(!isHidden);
  const blogCreatedBy = blog.user;
  const loggedUser = user;
  const dispatch = useDispatch();

  const blogStyle = {
    border: "3px solid grey",
    padding: "10px",
    margin: "10px",
  };

  const forPreviewedBlog = { ...blogStyle, display: isHidden ? "" : "none" };
  const forViewedBlog = { ...blogStyle, display: isHidden ? "none" : "" };

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blogCreatedBy.id,
    };
    dispatch(likeBlog(updatedBlog));
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(`Delete ${blog.title}?`);
    if (confirmation) {
      try {
        // eslint-disable-next-line no-unused-vars
        const deletedBlog = await dispatch(deleteBlog(blog));
        dispatch(setNotification("Deleted Succesfully", true));
      } catch (e) {
        const error = "Couldn't delete a blog";
        dispatch(setNotification(error, false));
      }
    }
  };

  return (
    <div className="blog">
      <div style={forPreviewedBlog} className="previewedBlog">
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={forViewedBlog} className="viewedBlog">
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
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
