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

  const blogCreatedByUser = user.id === blogToView.user.id;

  return (
    <Paper
      elevation={6}
      style={{
        ...individualBlogContainerStyle,
        ...individualBlogContainerLayout,
      }}
    >
      {blogCreatedByUser && <DeleteBlog blogToDelete={blogToView} />}
      <h2
        style={{
          marginTop: "50px",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >{`"${blogToView.title}"`}</h2>
      <span style={{ marginTop: "10px" }}>Author: {blogToView.author}</span>
      <div style={{ marginTop: "8px" }}>
        Added by{" "}
        {blogCreatedByUser ? `you (${user.username})` : blogToView.user.name}
      </div>
      <div style={{ marginTop: "8px" }}>
        Link: <Url address={blogToView.url} />
      </div>
      <Divider style={{ marginTop: "30px" }} />
      <BlogInfoBar blogToView={blogToView} />
      <Comments commentsOfBlog={blogToView.comments} />
    </Paper>
  );
};

export default IndividualBlogView;
