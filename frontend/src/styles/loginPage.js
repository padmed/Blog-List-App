import { colors } from "./theme";

export const loginPageStyle = {
  display: "flex",
  height: "100%",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const loginContainerStyle = {
  height: "550px",
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "10px",
  backgroundColor: colors.beige,
};

export const headingStyle = { width: "78%", marginTop: "40px" };

export const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "80%",
};

export const usernameInputStyle = { marginTop: "20px" };
export const passwordInputStyle = { marginTop: "40px", marginBottom: "60px" };

export const loginButtonStyle = {
  height: "60px",
  borderRadius: "10px",
  backgroundColor: colors.black,
  color: colors.beige,
};
