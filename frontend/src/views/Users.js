import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.allUsers);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <td>Names</td>
            <td>Blogs Created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
