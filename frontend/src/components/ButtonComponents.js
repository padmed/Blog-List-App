import { Button } from "@mui/material";
import ButtonRoundMobile from "./ButtonRoundMobile";
import PropTypes from "prop-types";
import { colors } from "../styles/theme";
import AddIcon from "@mui/icons-material/Add";

export const AddButton = ({ isMobile, handleClick }) =>
  isMobile ? (
    <ButtonRoundMobile
      handleClick={handleClick}
      type="add"
      position={{
        position: "fixed",
        bottom: 40,
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  ) : (
    <Button
      onClick={handleClick}
      style={{
        backgroundColor: colors.black,
        color: colors.beige,
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "50px",
      }}
    >
      <AddIcon style={{ marginRight: "10px", marginBottom: "2px" }} />
      <span>Add new blog</span>
    </Button>
  );

export const SubmitButton = ({ isMobile }) =>
  isMobile ? (
    <ButtonRoundMobile
      type="submit"
      position={{
        position: "fixed",
        bottom: 40,
        left: "60%",
        transform: "translate(-50%, -50%)",
      }}
    />
  ) : (
    <Button
      id="createBlogButton"
      type="submit"
      style={{
        backgroundColor: colors.black,
        color: colors.beige,
        marginTop: "30px",
        marginBottom: "20px",
        height: "50px",
      }}
    >
      Create
    </Button>
  );

export const CancelButton = ({ isMobile, handleClick }) =>
  isMobile ? (
    <ButtonRoundMobile
      handleClick={handleClick}
      type="cancel"
      position={{
        position: "fixed",
        bottom: 40,
        left: "40%",
        transform: "translate(-50%, -50%)",
      }}
    />
  ) : (
    <Button
      type="button"
      onClick={handleClick}
      style={{
        backgroundColor: colors.black,
        color: colors.beige,
        height: "50px",
      }}
    >
      Cancel
    </Button>
  );

AddButton.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

CancelButton.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

SubmitButton.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};
