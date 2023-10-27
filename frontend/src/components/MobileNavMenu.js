import MenuIcon from "@mui/icons-material/Menu";
import { Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MobileNavMenu = ({ handleLogout, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const logedUser = useSelector((state) =>
    state.allUsers.find((u) => u.username === user.username),
  );

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate(`/users/${logedUser.id}`);
  };

  if (!logedUser) return null;

  return (
    <>
      <IconButton
        style={{ position: "fixed", right: 20, top: 13 }}
        onClick={handleMenuOpen}
      >
        <MenuIcon style={{ fontSize: "25px" }}></MenuIcon>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        id="account-menu"
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: "''",
              display: "block",
              position: "absolute",
              top: 0,
              right: 17,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfileClick}>
          <AccountCircleIcon />
          <Typography style={{ marginLeft: "7px" }}>
            {logedUser.name}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon />
          <Typography style={{ marginLeft: "7px" }}>Log out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

MobileNavMenu.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default MobileNavMenu;
