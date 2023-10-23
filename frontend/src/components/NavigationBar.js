import { AppBar, Toolbar, Typography } from "@mui/material";
import { colors } from "../styles/theme";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (isMobile) {
    return (
      <AppBar
        position="static"
        sx={{
          height: "60px",
          width: "100%",
          backgroundColor: colors.beige,
          position: "fixed",
          top: 0,
          left: 0,
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <span className="appName">BlogBinder</span>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar
      position="static"
      sx={{
        height: "60px",
        width: "100%",
        backgroundColor: colors.beige,
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Toolbar>
        <span className="appName" style={{ marginLeft: "40px" }}>
          BlogBinder
        </span>
        <Typography sx={{ flexGrow: 1 }}>
          <Link
            to={"/"}
            className="link"
            style={{
              padding: "20px",
              marginLeft: "50px",
              textDecoration: "none",
            }}
          >
            Blogs
          </Link>
          <Link
            to={"/users"}
            className="link"
            style={{ padding: "20px", textDecoration: "none" }}
          >
            Users
          </Link>
        </Typography>

        <div>
          <span>{`Logged in as ${user.name} `}</span>
          <button type="submit" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
