import { useState } from "react";
import { saveNewBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import useIsMobile from "../hooks/useIsMobile";
import { formStyle } from "../styles/styles";
import { Paper, TextField } from "@mui/material";
import { AddButton, SubmitButton, CancelButton } from "./ButtonComponents";
import {
  blogFormContainerStyle,
  blogFormContainerMobileStyle,
} from "../styles/styles";
import {
  formLayout,
  headingLayout,
  inputLayot,
  blogsFormContainerLayout,
} from "../styles/layoutStyles";

const BlogForm = () => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [formVisibility, setFormVisibility] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const toggleVisibility = () => setFormVisibility(!formVisibility);

  const showForm = () => {
    toggleVisibility();
    window.scrollTo({
      top: 10,
      behavior: "smooth",
    });
  };

  const handleBlogInputChange = ({ target }) => {
    const { id, value } = target;

    if (id in newBlog) {
      setNewBlog({ ...newBlog, [id]: value });
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
      toggleVisibility();
    } catch (error) {
      dispatch(setNotification(error.response.data.errorMessage, false));
    }
  };

  const formContainerStyle = isMobile
    ? blogFormContainerMobileStyle
    : blogFormContainerStyle;

  if (!formVisibility) {
    return <AddButton isMobile={isMobile} handleClick={showForm} />;
  }

  return (
    <Paper
      elevation={6}
      style={{ ...formContainerStyle, ...blogsFormContainerLayout }}
    >
      <h3 style={headingLayout}>Create new</h3>
      <form onSubmit={handleCreateBlog} style={{ ...formStyle, ...formLayout }}>
        <TextField
          label="Content"
          onChange={handleBlogInputChange}
          value={newBlog.title}
          id="title"
          variant="outlined"
          style={inputLayot}
        />
        <TextField
          label="Author"
          onChange={handleBlogInputChange}
          value={newBlog.author}
          id="author"
          variant="outlined"
          style={inputLayot}
        />
        <TextField
          label="Url"
          onChange={handleBlogInputChange}
          value={newBlog.url}
          id="url"
          variant="outlined"
          style={inputLayot}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px",
            marginBottom: "40px",
          }}
        >
          {isMobile ? (
            <>
              <CancelButton
                isMobile={isMobile}
                handleClick={toggleVisibility}
              />
              <SubmitButton isMobile={isMobile} />
            </>
          ) : (
            <>
              <SubmitButton isMobile={isMobile} />
              <CancelButton
                isMobile={isMobile}
                handleClick={toggleVisibility}
              />
            </>
          )}
        </div>
      </form>
    </Paper>
  );
};

export default BlogForm;
