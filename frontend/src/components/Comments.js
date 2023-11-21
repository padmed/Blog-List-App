import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { addComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, Divider, List, ListItem, Paper } from "@mui/material";
import {
  commentInputStyle,
  submitButtonStyle,
  commentStyle,
} from "../styles/styles";
import {
  commentInputLayout,
  commentButtonLayout,
  commentFormLayout,
  commentLayout,
  commentsContLayout,
} from "../styles/layoutStyles";

const Comments = ({ commentsOfBlog }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleAddComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;

    if (comment.length > 1) {
      e.target.comment.value = "";
      dispatch(addComment(id, comment));
    }
  };

  return (
    <div>
      <form onSubmit={handleAddComment} style={{ ...commentFormLayout }}>
        <TextField
          name="comment"
          variant="standard"
          placeholder="Add comment"
          multiline
          sx={{ ...commentInputStyle, ...commentInputLayout }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ ...submitButtonStyle, ...commentButtonLayout }}
        >
          Submit
        </Button>
      </form>
      {commentsOfBlog.length > 0 && <h4>Comments</h4>}
      <List style={{ ...commentsContLayout }}>
        {commentsOfBlog.map((comment) => (
          <Paper
            elevation={4}
            key={uuidv4()}
            style={{ ...commentStyle, ...commentLayout }}
          >
            <ListItem>{comment}</ListItem>
            <Divider />
          </Paper>
        ))}
      </List>
    </div>
  );
};

Comments.propTypes = {
  commentsOfBlog: PropTypes.array.isRequired,
};

export default Comments;
