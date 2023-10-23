import { Paper, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  headingStyle,
  signupContainerStyle,
  usernameInputStyle,
  formStyle,
  signupFormButtonStyle,
  inputStyle,
  signRedirectStyle,
  linkStyle,
} from "../styles/styles";
import Trademark from "./Trademark";
import useField from "../hooks/useField";
import { useEffect, useState } from "react";
import PasswordField from "./PasswordField";
import userServices from "../services/users";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import InputAdornment from "@mui/material/InputAdornment";
import ValidationInfo from "./ValidationInfo";

const SignUpForm = () => {
  const name = useField("text");
  const username = useField("text");
  const password = useField("password");
  const repeatPassword = useField("password");
  const [inputError, setInputError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (repeatPassword.value !== "") {
      if (password.value === repeatPassword.value) {
        setInputError(false);
      } else {
        setInputError(true);
      }
    } else {
      setInputError(false);
    }
  }, [repeatPassword.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.value.length < 3) {
      dispatch(
        setNotification("Username must be at least 3 characters long", false),
      );
      return;
    } else if (password.value.length < 3) {
      dispatch(
        setNotification("Password must be at least 3 characters long", false),
      );
      return;
    } else if (password.value !== repeatPassword.value) {
      dispatch(setNotification("Passwords do not match", false));
      return;
    }

    try {
      await userServices.addUser({
        username: username.value,
        name: name.value,
        password: password.value,
      });
      dispatch(
        setNotification(
          "User successfully registered, log in to continue",
          true,
        ),
      );
      navigate("/");
    } catch (error) {
      dispatch(setNotification(error.response.data.errorMessage, false));
    }
  };

  return (
    <Paper elevation={12} style={signupContainerStyle}>
      <div style={headingStyle}>
        <h1>Sign Up</h1>
      </div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <TextField
          {...name}
          label="Name"
          style={usernameInputStyle}
          color="primary"
        ></TextField>
        <TextField
          {...username}
          label="Username"
          style={inputStyle}
          autoComplete="username"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ValidationInfo inputValue={username.value} />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <PasswordField
          fieldProps={password}
          label={"Password"}
          inputError={inputError}
        />
        <PasswordField
          fieldProps={repeatPassword}
          label="Repeat Password"
          inputError={inputError}
        />
        <Button variant="contained" type="submit" style={signupFormButtonStyle}>
          Sign Up
        </Button>
      </form>
      <span style={signRedirectStyle}>
        {"Already have an account? "}{" "}
        <Link style={linkStyle} to={"/"}>
          Log in
        </Link>
      </span>
      <Trademark />
    </Paper>
  );
};

export default SignUpForm;
