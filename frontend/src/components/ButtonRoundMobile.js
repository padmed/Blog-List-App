import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { colors } from "../styles/theme";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import DoneIcon from "@mui/icons-material/Done";
import { roundButtonStyle } from "../styles/styles";
import { roundButtonLayout } from "../styles/layoutStyles";

const ButtonRoundMobile = ({ type = "add", position, handleClick }) => {
  let icon;
  let buttonStyle = { backgroundColor: colors.black, color: colors.beige };

  if (type === "add") {
    icon = <AddIcon style={{ fontSize: "45px" }} />;
  } else if (type === "cancel") {
    icon = <CloseIcon style={{ fontSize: "45px" }} />;
  } else if (type === "submit") {
    icon = <DoneIcon style={{ fontSize: "45px" }} />;
  }

  return (
    <IconButton
      onClick={handleClick}
      style={{
        ...buttonStyle,
        ...position,
        ...roundButtonStyle,
        ...roundButtonLayout,
      }}
      type={type === "submit" ? "submit" : "button"}
    >
      {icon}
    </IconButton>
  );
};

ButtonRoundMobile.propTypes = {
  type: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
};
export default ButtonRoundMobile;
