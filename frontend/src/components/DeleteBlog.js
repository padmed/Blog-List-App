import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { colors } from "../styles/theme";

const DeleteBlog = ({ blogToDelete }) => {
  const loggedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (loggedUser.username !== blogToDelete.user.username) {
    return null;
  }

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
      style={{ position: "absolute", top: 10, right: 10 }}
    >
      <DeleteIcon style={{ color: colors.red }} />
    </IconButton>
  );
};

DeleteBlog.propTypes = {
  blogToDelete: PropTypes.object.isRequired,
};
export default DeleteBlog;
