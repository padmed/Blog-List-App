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
  height: "580px",
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "10px",
  backgroundColor: colors.beige,
  marginTop: "20px",
};

export const signupContainerStyle = { ...loginContainerStyle, height: "750px" };

export const headingStyle = { width: "78%", marginTop: "40px" };

export const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "80%",
};

export const usernameInputStyle = { marginTop: "20px" };
export const passwordInputStyle = { marginTop: "40px" };
export const inputStyle = { marginTop: "30px" };

export const formButtonStyle = {
  marginTop: "50px",
  height: "60px",
  borderRadius: "10px",
  backgroundColor: colors.black,
  color: colors.beige,
};

export const signRedirectStyle = {
  marginTop: "20px",
};

export const linkStyle = { color: colors.orange, textDecoration: "none" };

export const copyrightStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "rgba(0,0,0,0.5)",
  fontSize: "15px",
  marginTop: "5px",
};

export const appNameStyle = { marginTop: "35px" };
