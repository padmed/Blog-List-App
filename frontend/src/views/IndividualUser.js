import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IndividualUser = () => {
  const { id } = useParams();
  const userToShow = useSelector((state) =>
    state.allUsers.find((user) => user.id === id),
  );

  if (!userToShow) {
    return null;
  }

  if (userToShow.blogs.length === 0) {
    return <h2>No blogs by {userToShow.name}</h2>;
  }

  return (
    <div>
      <h2>{userToShow.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {userToShow.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default IndividualUser;
