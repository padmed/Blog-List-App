import PropTypes from "prop-types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { likesComponentLayout } from "../styles/layoutStyles";

const LikesComponent = ({ handleLike, likes }) => {
  return (
    <div style={{ ...likesComponentLayout }}>
      <IconButton onClick={handleLike} style={{ color: "black" }}>
        <FavoriteIcon style={{ fontSize: "17px", marginRight: "4px" }} />
      </IconButton>
      {likes}
    </div>
  );
};

LikesComponent.propTypes = {
  handleLike: PropTypes.func.isRequired,
  likes: PropTypes.number.isRequired,
};

export default LikesComponent;
