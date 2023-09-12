import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import blogService from "../services/blogs";

function UserInApp() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    blogService.setToken(null);
    window.localStorage.clear();
  };

  return (
    <p>
      {`Logged in as ${user.name} `}
      <button type="submit" onClick={handleLogout}>
        Log out
      </button>
    </p>
  );
}

export default UserInApp;
