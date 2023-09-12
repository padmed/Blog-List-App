import { useState } from "react";
import { loginUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedInUser = await dispatch(loginUser({ username, password }));
      dispatch(setNotification(`${loggedInUser.name} is logged in`, true));
    } catch (error) {
      dispatch(setNotification("Invalid username or password", false));
    }

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            id="usernameInput"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
        </div>
        <div>
          <label>password</label>
          <input
            id="passwordInput"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <button id="loginButton" type="submit">
          log in
        </button>
      </form>
    </>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
