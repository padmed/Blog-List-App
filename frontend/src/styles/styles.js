import { colors } from "./theme";

export const loginPageStyle = {
  height: "100%",
  width: "100%",
};

export const loginContainerStyle = {
  height: "580px",
  width: "50%",
  minWidth: "300px",
  borderRadius: "10px",
  backgroundColor: colors.beige,
};

export const signupContainerStyle = { ...loginContainerStyle, height: "750px" };

export const headingStyle = { width: "78%" };

export const formStyle = {
  width: "80%",
};

export const formButtonStyle = {
  height: "60px",
  borderRadius: "10px",
  backgroundColor: colors.black,
  color: colors.beige,
};

export const signupFormButtonStyle = { ...formButtonStyle, marginTop: "35px" };
export const linkStyle = { color: colors.orange, textDecoration: "none" };

export const copyrightStyle = {
  color: "rgba(0,0,0,0.5)",
  fontSize: "15px",
};

// export const wrongPasswordStyle = {
//   height: "20px",
//   marginTop: "5px",
//   color: colors.red,
//   marginLeft: "5px",
//   fontSize: "15px",
// };

export const navigationContainerStyle = {
  height: "60px",
  width: "100%",
  backgroundColor: colors.beige,
};

export const firstNavLinkStyle = {
  textDecoration: "none",
};

export const navLinkStyle = { textDecoration: "none" };

export const logoutButtonStyle = {
  backgroundColor: colors.black,
  color: colors.beige,
  fontSize: "12px",
  textTransform: "none",
};

export const roundButtonStyle = {
  width: "60px",
  height: "60px",
  borderRadius: "100%",
};
