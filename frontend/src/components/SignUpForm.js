import { Paper, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  headingStyle,
  signupContainerStyle,
  formStyle,
  linkStyle,
  formButtonStyle,
} from "../styles/styles";
import Trademark from "./Trademark";
import useField from "../hooks/useField";
import { useEffect, useState } from "react";
import userServices from "../services/users";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import ValidatedTextField from "./ValidatedTextField";
import {
  usernameInputLayout,
  loginPageLayout,
  formLayout,
  signupFormButtonLayout,
  signRedirectLayout,
} from "../styles/layoutStyles";

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

    const isInvalidLength = (value, minLength, fieldName) => {
      if (value.length < minLength) {
        dispatch(
          setNotification(
            `${fieldName} must be at least ${minLength} characters long`,
            false,
          ),
        );
        return true;
      }
      return false;
    };

    const { value: nameValue } = name;
    const { value: usernameValue } = username;
    const { value: passwordValue } = password;
    const { value: repeatPasswordValue } = repeatPassword;

    if (
      isInvalidLength(nameValue, 3, "Name") ||
      isInvalidLength(usernameValue, 3, "Username") ||
      isInvalidLength(passwordValue, 3, "Password")
    ) {
      return;
    }

    if (passwordValue !== repeatPasswordValue) {
      dispatch(setNotification("Passwords do not match", false));
      return;
    }

    try {
      await userServices.addUser({
        username: usernameValue,
        name: nameValue,
        password: passwordValue,
      });
      dispatch(
        setNotification(
          "User successfully registered, log in to continue",
          true,
        ),
      );
      navigate("/");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.errorMessage
        : "An error occurred while registering the user.";
      dispatch(setNotification(errorMessage, false));
    }
  };

  return (
    <Paper
      elevation={12}
      style={{ ...signupContainerStyle, ...loginPageLayout }}
    >
      <div style={headingStyle}>
        <h1>Sign Up</h1>
      </div>
      <form style={{ ...formStyle, ...formLayout }} onSubmit={handleSubmit}>
        <ValidatedTextField
          fieldProps={name}
          label="Name"
          style={usernameInputLayout}
        />
        <ValidatedTextField
          fieldProps={username}
          label="Username"
          autoComplete="username"
        />
        <ValidatedTextField
          fieldProps={password}
          label={"Password"}
          inputError={inputError}
        />
        <ValidatedTextField
          fieldProps={repeatPassword}
          label="Repeat Password"
          inputError={inputError}
        />
        <Button
          variant="contained"
          type="submit"
          style={{ ...formButtonStyle, ...signupFormButtonLayout }}
        >
          Sign Up
        </Button>
      </form>
      <span style={signRedirectLayout}>
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
