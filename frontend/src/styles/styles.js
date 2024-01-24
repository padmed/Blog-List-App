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
  "&:hover": {
    backgroundColor: colors.red,
  },
};

export const roundButtonStyle = {
  width: "60px",
  height: "60px",
  borderRadius: "100%",
};

export const blogFormContainerStyle = {
  width: "100%",
  height: "540px",
  border: "2px solid",
};

export const blogFormContainerMobileStyle = {
  ...blogFormContainerStyle,
  height: "400px",
};

export const blogStyle = {
  width: "calc(100% - 40px)",
  fontSize: "25px",
  border: "2px solid black",
};

export const blogAuthorStyle = {
  fontSize: "18px",
};

export const blogLinkStyle = {
  fontSize: "20px",
  textDecoration: "none",
  color: colors.black,
};

export const blogLinkIconStyle = {
  fontSize: "18px",
};

export const individualBlogContainerStyle = {
  border: "2px solid",
};

export const commentInputStyle = {
  width: "80%",
  minWidth: "200px",
};

export const submitButtonStyle = {
  backgroundColor: colors.black,
  color: "beige",
  width: "150px",
  "&:hover": {
    backgroundColor: colors.green,
  },
};

export const commentStyle = {
  overflow: "hidden",
  whiteSpace: "break-spaces",
  border: "2px solid",
  maxWidth: "100%",
  minWidth: "300px",
};

export const blackToRedIcon = {
  color: "black",
  "&:hover": {
    color: colors.red,
  },
};

export const blackToOrangeIcon = {
  color: "black",
  "&:hover": {
    color: colors.orange,
  },
};

export const likeButtonStyle = {
  fontSize: "17px",
};
