import PropTypes from "prop-types";
import { likeBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const Likes = ({ blogToLike }) => {
  const dispatch = useDispatch();
  const handleLike = () => {
    const blogToUpdate = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    };
    dispatch(likeBlog(blogToUpdate));
  };

  return (
    <div>
      {blogToLike.likes} Likes <button onClick={handleLike}>Like</button>
    </div>
  );
};

Likes.propTypes = {
  blogToLike: PropTypes.object.isRequired,
};
export default Likes;
