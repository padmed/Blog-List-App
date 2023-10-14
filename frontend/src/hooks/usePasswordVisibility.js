import { InputAdornment } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const usePasswordVisibility = () => {
  const [visibility, setVisibility] = useState(false);

  return {
    visibility,
    component: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => {
            setVisibility(!visibility);
          }}
        >
          {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </InputAdornment>
    ),
  };
};

export default usePasswordVisibility;
