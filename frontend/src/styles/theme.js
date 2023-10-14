import { createTheme } from "@mui/material/styles";

export const colors = {
  beige: "rgb(248,245,241)",
  black: "rgb(0,0,0)",
  orange: "rgb(249, 123, 34)",
  red: "#f44336",
  green: "#388e3c",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.orange,
    },
    error: {
      main: colors.red,
    },
    success: {
      main: colors.green,
    },
  },
});

export default theme;
