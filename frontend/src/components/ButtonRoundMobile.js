import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { colors } from "../styles/theme";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import DoneIcon from "@mui/icons-material/Done";
import { roundButtonStyle } from "../styles/styles";

const ButtonRoundMobile = ({ type = "add", position, handleClick }) => {
  let icon;
  let buttonStyle = {};

  if (type === "add") {
    icon = <AddIcon style={{ fontSize: "45px" }} />;
    buttonStyle = {
      backgroundColor: colors.black,
      color: colors.beige,
    };
  } else if (type === "cancel") {
    icon = <CloseIcon style={{ fontSize: "45px" }} />;
    buttonStyle = {
      backgroundColor: colors.orange,
      color: colors.beige,
    };
  } else if (type === "submit") {
    icon = <DoneIcon style={{ fontSize: "45px" }} />;
    buttonStyle = {
      backgroundColor: colors.green,
      color: colors.beige,
    };
  }

  return (
    <IconButton
      onClick={handleClick}
      style={{
        ...buttonStyle,
        ...position,
        ...roundButtonStyle,
      }}
      type="submit"
    >
      {icon}
    </IconButton>
  );
};

ButtonRoundMobile.propTypes = {
  type: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default ButtonRoundMobile;
