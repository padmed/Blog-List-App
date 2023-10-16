import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { colors } from "../styles/theme";
import InfoIcon from "@mui/icons-material/Info";
import { PropTypes } from "prop-types";

const ValidationInfo = ({ inputError, inputValue }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    inputError
      ? setTitle("Passwords do not match")
      : setTitle("Input value must be at least 3 characters long");
  }, [inputError]);

  const handleMouseEnter = () => {
    setIsTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipOpen(false);
  };

  const iconColor = inputError ? colors.red : colors.orangeLight;

  if (!inputError && inputValue.length >= 3) {
    return null;
  }

  return (
    <Tooltip title={title} open={isTooltipOpen} arrow>
      <InfoIcon
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "pointer", color: iconColor }}
      />
    </Tooltip>
  );
};

ValidationInfo.propTypes = {
  inputError: PropTypes.bool,
  inputValue: PropTypes.string.isRequired,
};

export default ValidationInfo;
