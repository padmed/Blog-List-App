import { useState } from "react";
import { saveNewBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import useIsMobile from "../hooks/useIsMobile";
import { formStyle } from "../styles/styles";
import { Paper, TextField } from "@mui/material";
import { colors } from "../styles/theme";
import { AddButton, SubmitButton, CancelButton } from "./ButtonComponents";

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

  if (!formVisibility) {
    return <AddButton isMobile={isMobile} handleClick={toggleVisibility} />;
  }

  return (
    <Paper
      elevation={6}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: colors.beige,
        height: "400px",
        borderRadius: "10px",
      }}
    >
      <h3>Create new</h3>
      <form onSubmit={handleCreateBlog} style={formStyle}>
        <TextField
          label="Title"
          onChange={handleBlogInputChange}
          value={newBlog.title}
          id="title"
          variant="outlined"
        />
        <TextField
          label="Author"
          onChange={handleBlogInputChange}
          value={newBlog.author}
          id="author"
          variant="outlined"
        />
        <TextField
          label="Url"
          onChange={handleBlogInputChange}
          value={newBlog.url}
          id="url"
          variant="outlined"
        />
        {isMobile ? (
          <>
            <CancelButton isMobile={isMobile} handleClick={toggleVisibility} />
            <SubmitButton isMobile={isMobile} />
          </>
        ) : (
          <>
            <SubmitButton isMobile={isMobile} />
            <CancelButton isMobile={isMobile} handleClick={toggleVisibility} />
          </>
        )}
      </form>
    </Paper>
  );
};

export default BlogForm;
