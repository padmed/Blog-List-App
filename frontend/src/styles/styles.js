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
  minWidth: "300px",
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

export const signupFormButtonStyle = { ...formButtonStyle, marginTop: "35px" };

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

export const wrongPasswordStyle = {
  height: "20px",
  marginTop: "5px",
  color: colors.red,
  marginLeft: "5px",
  fontSize: "15px",
};

export const navigationContainerStyle = {
  height: "60px",
  width: "100%",
  backgroundColor: colors.beige,
  position: "fixed",
  top: 0,
  left: 0,
  justifyContent: "center",
};

export const appNameMobileNavStyle = { justifyContent: "center" };

export const appNameNavStyle = { marginLeft: "40px" };

export const firstNavLinkStyle = {
  padding: "20px",
  marginLeft: "50px",
  textDecoration: "none",
};

export const navLinkStyle = { padding: "20px", textDecoration: "none" };

export const logoutButtonStyle = {
  backgroundColor: colors.black,
  color: colors.beige,
  fontSize: "12px",
  textTransform: "none",
};

export const roundButtonStyle = {
  padding: "15px",
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "100%",
};
