import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import useIsMobile from "../hooks/useIsMobile";
import MobileNavMenu from "./MobileNavMenu";
import {
  navigationContainerStyle,
  firstNavLinkStyle,
  navLinkStyle,
  logoutButtonStyle,
} from "../styles/styles";
import {
  appNameMobileNavLayout,
  appNameNavLayout,
  navigationContainerLayout,
  firstNavLinkLayout,
  navLinkLayout,
} from "../styles/layoutStyles";

const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (isMobile) {
    return (
      <AppBar
        position="static"
        sx={{ ...navigationContainerStyle, ...navigationContainerLayout }}
      >
        <Toolbar sx={appNameMobileNavLayout}>
          <span className="appName">BlogBinder</span>
        </Toolbar>
        <MobileNavMenu handleLogout={handleLogout} user={user} />
      </AppBar>
    );
  }

  return (
    <AppBar
      position="static"
      sx={{ ...navigationContainerStyle, ...navigationContainerLayout }}
    >
      <Toolbar>
        <span className="appName" style={appNameNavLayout}>
          BlogBinder
        </span>
        <Typography sx={{ flexGrow: 1 }}>
          <Link
            to={"/"}
            className="link"
            style={{ ...firstNavLinkStyle, ...firstNavLinkLayout }}
          >
            Blogs
          </Link>
          <Link
            to={"/users"}
            className="link"
            style={{ ...navLinkStyle, ...navLinkLayout }}
          >
            Users
          </Link>
        </Typography>

        <div>
          <span
            style={{ marginRight: "15px" }}
          >{`Logged in as ${user.name} `}</span>
          <Button
            variant="contained"
            type="submit"
            onClick={handleLogout}
            size="small"
            sx={logoutButtonStyle}
          >
            Log out
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
