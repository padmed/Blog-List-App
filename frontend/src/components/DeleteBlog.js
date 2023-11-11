import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { blackToRedIcon } from "../styles/styles";
import { deleteButtonLayout } from "../styles/layoutStyles";

const DeleteBlog = ({ blogToDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmation = window.confirm(`Delete ${blogToDelete.title}?`);
    if (confirmation) {
      try {
        // eslint-disable-next-line no-unused-vars
        const deletedBlog = await dispatch(deleteBlog(blogToDelete));
        navigate("/");
        dispatch(setNotification("Deleted Succesfully", true));
      } catch (e) {
        const error = "Couldn't delete a blog";
        dispatch(setNotification(error, false));
      }
    }
  };

  return (
    <IconButton
      onClick={handleDelete}
      sx={{ ...blackToRedIcon, ...deleteButtonLayout }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

DeleteBlog.propTypes = {
  blogToDelete: PropTypes.object.isRequired,
};
export default DeleteBlog;
