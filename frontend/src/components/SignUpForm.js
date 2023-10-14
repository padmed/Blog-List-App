import { Paper, TextField, Button } from "@mui/material";
import { colors } from "../styles/theme";
import { Link } from "react-router-dom";

import {
  headingStyle,
  signupContainerStyle,
  usernameInputStyle,
  formStyle,
  formButtonStyle,
} from "../styles/styles";
import Trademark from "./Trademark";

const SignUpForm = () => {
  return (
    <Paper elevation={12} style={signupContainerStyle}>
      <div style={headingStyle}>
        <h1>Sign Up</h1>
      </div>
      <form style={formStyle}>
        <TextField
          label="Name"
          style={usernameInputStyle}
          color="primary"
        ></TextField>
        <TextField
          label="Username"
          style={{ marginTop: "30px" }}
          color="primary"
        ></TextField>
        <TextField
          label="Password"
          style={{ marginTop: "30px" }}
          color="primary"
        ></TextField>
        <TextField
          label="Repeat Password"
          style={{ marginTop: "30px" }}
          color="primary"
        ></TextField>
        <Button variant="contained" type="submit" style={formButtonStyle}>
          Sign Up
        </Button>
      </form>
      <span style={{ marginTop: "20px" }}>
        {"Already have an account? "}{" "}
        <Link style={{ color: colors.orange, textDecoration: "none" }} to={"/"}>
          Log in
        </Link>
      </span>
      <Trademark />
    </Paper>
  );
};

export default SignUpForm;
