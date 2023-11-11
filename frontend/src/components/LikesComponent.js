import PropTypes from "prop-types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { likesComponentLayout } from "../styles/layoutStyles";
import { blackToRedIcon } from "../styles/styles";
import { likeButtonLayout } from "../styles/layoutStyles";
import { likeButtonStyle } from "../styles/styles";

const LikesComponent = ({ handleLike, likes }) => {
  return (
    <div style={{ ...likesComponentLayout }}>
      <IconButton
        onClick={handleLike}
        sx={{ ...blackToRedIcon, ...likeButtonLayout }}
      >
        <FavoriteIcon sx={{ ...likeButtonStyle }} />
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
