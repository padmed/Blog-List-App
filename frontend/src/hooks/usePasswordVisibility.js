import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { colors } from "../styles/theme";

const usePasswordVisibility = () => {
  const [visibility, setVisibility] = useState(false);

  return {
    visibility,
    component: (
      <>
        <IconButton
          style={{ color: colors.orangeLight }}
          onClick={() => {
            setVisibility(!visibility);
          }}
        >
          {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </>
    ),
  };
};

export default usePasswordVisibility;
