import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Likes from "../components/Likes";
import DeleteBlog from "../components/DeleteBlog";
import Url from "../components/Url";

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
    <div>
      <h2>
        {`"${blogToView.title}"`} by {blogToView.author}
      </h2>
      <div>
        Link: <Url address={blogToView.url} />
      </div>
      <Likes blogToLike={blogToView} />
      <div>
        Added by{" "}
        {user.username === blogToView.user.username
          ? `you (${user.username})`
          : blogToView.user.name}
        <DeleteBlog blogToDelete={blogToView} />
      </div>
    </div>
  );
};

export default IndividualBlogView;
