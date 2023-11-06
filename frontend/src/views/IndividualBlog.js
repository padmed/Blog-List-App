import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteBlog from "../components/DeleteBlog";
import Url from "../components/Url";
import Comments from "../components/Comments";
import { Divider, Paper } from "@mui/material";
import BlogInfoBar from "../components/BlogInfoBar";
import { individualBlogContainerStyle } from "../styles/styles";
import { individualBlogContainerLayout } from "../styles/layoutStyles";

const IndividualBlogView = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const blogToView = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  );

  if (!blogToView) {
    return null;
  }

  return (
    <Paper
      elevation={6}
      style={{
        ...individualBlogContainerStyle,
        ...individualBlogContainerLayout,
      }}
    >
      <h2>{`"${blogToView.title}"`}</h2>
      <span>Author: {blogToView.author}</span>
      <div>
        Added by{" "}
        {user.username === blogToView.user.username
          ? `you (${user.username})`
          : blogToView.user.name}
        <DeleteBlog blogToDelete={blogToView} />
      </div>
      <div>
        Link: <Url address={blogToView.url} />
      </div>
      <Divider style={{ marginTop: "30px" }} />
      <BlogInfoBar blogToView={blogToView} />
      <Comments commentsOfBlog={blogToView.comments} />
    </Paper>
  );
};

export default IndividualBlogView;
