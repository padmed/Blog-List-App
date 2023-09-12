import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

function UserInApp() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
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
