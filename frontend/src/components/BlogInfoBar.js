import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";
import { BlogInfoBarLayout } from "../styles/layoutStyles";
import LikesComponent from "./LikesComponent";
import CopyUrlButton from "./CopyUrlButton";

const BlogInfoBar = ({ blogToView }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    const blogToUpdate = {
      ...blogToView,
      likes: blogToView.likes + 1,
      user: blogToView.user.id,
    };
    dispatch(likeBlog(blogToUpdate));
  };

  return (
    <div style={{ ...BlogInfoBarLayout }}>
      <LikesComponent handleLike={handleLike} likes={blogToView.likes} />
      <div style={{ marginLeft: "40px" }}>
        {blogToView.comments.length} comments
      </div>
      <CopyUrlButton />
    </div>
  );
};

BlogInfoBar.propTypes = {
  blogToView: PropTypes.object.isRequired,
};
export default BlogInfoBar;
