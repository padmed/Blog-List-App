import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import GroupIcon from "@mui/icons-material/Group";
import { colors } from "../styles/theme";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BottomNavigationBar = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  useEffect(() => {
    page === 0 ? navigate("/") : navigate("/users");
  }, [page]);

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
            onClick={() => setPage(0)}
            label="Blogs"
            icon={<TextSnippetIcon />}
          />
          <BottomNavigationAction
            onClick={() => setPage(1)}
            label="Users"
            icon={<GroupIcon />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default BottomNavigationBar;
