import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "@mui/material/Container";
import "./styles/index.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Container style={{ height: "100vh" }}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </Container>
  </ThemeProvider>,
);
