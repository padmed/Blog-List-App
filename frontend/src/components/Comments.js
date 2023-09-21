import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Comments = ({ commentsOfBlog }) => {
  return (
    <div>
      <h4>Comments</h4>
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
