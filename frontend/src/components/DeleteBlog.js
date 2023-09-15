import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";

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

  return <button onClick={handleDelete}>Delete</button>;
};

DeleteBlog.propTypes = {
  blogToDelete: PropTypes.object.isRequired,
};
export default DeleteBlog;
