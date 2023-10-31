import { Divider, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  blogStyle,
  blogAuthorStyle,
  blogLinkStyle,
  blogLinkIconStyle,
} from "../styles/styles";
import {
  blogLayout,
  blogAuthorLayout,
  blogLinkLayout,
  blogLinkTextLayout,
  blogLinkIconLayout,
} from "../styles/layoutStyles";

const Blog = ({ title, id, author }) => {
  return (
    <Paper elevation={6} style={{ ...blogStyle, ...blogLayout }}>
      <span>{title}</span>
      <span style={{ ...blogAuthorStyle, ...blogAuthorLayout }}>
        Added by {author}
      </span>
      <Divider />
      <Link style={{ ...blogLinkStyle, ...blogLinkLayout }} to={`/blogs/${id}`}>
        <div className="link" style={{ ...blogLinkTextLayout }}>
          View Blog{" "}
          <LaunchIcon style={{ ...blogLinkIconStyle, ...blogLinkIconLayout }} />
        </div>
      </Link>
    </Paper>
  );
};

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default Blog;
