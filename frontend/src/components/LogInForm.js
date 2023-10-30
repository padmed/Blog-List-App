import { useState } from "react";
import { loginUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Trademark from "./Trademark";
import { Link } from "react-router-dom";
import { loginContainerStyle } from "../styles/styles";
import {
  headingStyle,
  formStyle,
  formButtonStyle,
  linkStyle,
} from "../styles/styles";
import usePasswordVisibility from "../hooks/usePasswordVisibility";
import {
  loginContainerLayout,
  headingLayout,
  formLayout,
  usernameInputLayout,
  passwordInputLayout,
  formButtonLayout,
  signRedirectLayout,
} from "../styles/layoutStyles";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const passwordVisibility = usePasswordVisibility();
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
    <Paper
      elevation={12}
      style={{ ...loginContainerStyle, ...loginContainerLayout }}
    >
      <div style={{ ...headingStyle, ...headingLayout }}>
        <h1>Log in</h1>
      </div>
      <form onSubmit={handleLogin} style={{ ...formStyle, ...formLayout }}>
        <TextField
          label="Username"
          id="usernameInput"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          style={usernameInputLayout}
          color="primary"
          autoComplete="username"
        ></TextField>
        <TextField
          label="Password"
          type={passwordVisibility.visibility ? "text" : "password"}
          id="passwordInput"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          style={passwordInputLayout}
          InputProps={{
            endAdornment: passwordVisibility.component,
          }}
          autoComplete="current-password"
        ></TextField>
        <Button
          variant="contained"
          id="loginButton"
          type="submit"
          style={{ ...formButtonStyle, ...formButtonLayout }}
        >
          LOG IN
        </Button>
      </form>
      <span style={signRedirectLayout}>
        {"Don't have an account? "}{" "}
        <Link style={linkStyle} to={"/signup"}>
          Sign up
        </Link>
      </span>
      <Trademark />
    </Paper>
  );
};

export default LoginForm;
