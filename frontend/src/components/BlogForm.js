import { useState } from "react";
import PropTypes from "prop-types";
import { saveNewBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleBlogInputChange = (event) => {
    const propertyToChange = event.target.id;
    const valueToChange = event.target.value;

    if (propertyToChange in newBlog) {
      setNewBlog({ ...newBlog, [propertyToChange]: valueToChange });
    }
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await dispatch(saveNewBlog(newBlog));
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
      dispatch(setNotification(`A new blog "${newBlog.title}" added`, true));
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(setNotification(error.response.data.errorMessage, false));
    }
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            onChange={handleBlogInputChange}
            value={newBlog.title}
          ></input>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            onChange={handleBlogInputChange}
            value={newBlog.author}
          ></input>
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            id="url"
            onChange={handleBlogInputChange}
            value={newBlog.url}
          ></input>
        </div>
        <button id="createBlogButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
};

export default BlogForm;
