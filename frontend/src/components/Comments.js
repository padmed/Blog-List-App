import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { addComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Comments = ({ commentsOfBlog }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleAddComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    e.target.comment.value = "";
    dispatch(addComment(id, comment));
  };

  return (
    <div>
      <h4>Comments</h4>
      <form onSubmit={handleAddComment}>
        <input name="comment"></input>
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {commentsOfBlog.map((comment) => (
          <li key={uuidv4()}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

Comments.propTypes = {
  commentsOfBlog: PropTypes.array.isRequired,
};

export default Comments;
