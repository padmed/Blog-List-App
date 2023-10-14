import { createTheme } from "@mui/material/styles";

export const colors = {
  beige: "rgb(248,245,241)",
  black: "rgb(0,0,0)",
  orange: "rgb(249, 123, 34)",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.orange,
    },
  },
});

export default theme;
