import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import GroupIcon from "@mui/icons-material/Group";
import { colors } from "../styles/theme";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/config";

const BottomNavigationBar = () => {
  const navigate = useNavigate();

  const handlePageChange = (pageIndex) => {
    if (pageIndex === 0) {
      navigate(ROUTES.HOME);
    } else if (pageIndex === 1) {
      navigate(ROUTES.USERS);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <Paper elevation={12}>
        <BottomNavigation showLabels sx={{ backgroundColor: colors.beige }}>
          <BottomNavigationAction
            onClick={() => handlePageChange(0)}
            label="Blogs"
            icon={<TextSnippetIcon />}
          />
          <BottomNavigationAction
            onClick={() => handlePageChange(1)}
            label="Users"
            icon={<GroupIcon />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default BottomNavigationBar;
