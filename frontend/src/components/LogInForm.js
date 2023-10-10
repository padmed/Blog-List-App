import { useState } from "react";
import { loginUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {
  headingStyle,
  formStyle,
  usernameInputStyle,
  passwordInputStyle,
  loginButtonStyle,
} from "../styles/loginPage";

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
      <div style={headingStyle}>
        <h1>Log in</h1>
      </div>
      <form onSubmit={handleLogin} style={formStyle}>
        <TextField
          label="Username"
          id="usernameInput"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          style={usernameInputStyle}
          color="primary"
        ></TextField>
        <TextField
          label="Password"
          id="passwordInput"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          style={passwordInputStyle}
        ></TextField>
        <Button
          variant="contained"
          id="loginButton"
          type="submit"
          style={loginButtonStyle}
        >
          LOG IN
        </Button>
      </form>
      <span style={{ marginTop: "20px" }}>
        {"Don't have an account? Sign up"}{" "}
      </span>
    </>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
