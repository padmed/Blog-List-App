import { Button } from "@mui/material";
import ButtonRoundMobile from "./ButtonRoundMobile";
import PropTypes from "prop-types";
import { colors } from "../styles/theme";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

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
      sx={{
        backgroundColor: colors.black,
        color: colors.beige,
        display: "flex",
        alignItems: "center",
        height: "50px",
        width: "200px",
        position: "fixed",
        bottom: 70,
        borderRadius: "10px",
        ":hover": {
          backgroundColor: "green",
        },
      }}
    >
      <NoteAddIcon style={{ marginRight: "10px", marginBottom: "2px" }} />
      <span>Add new blog</span>
    </Button>
  );

export const SubmitButton = ({ isMobile }) =>
  isMobile ? (
    <ButtonRoundMobile
      type="submit"
      position={{
        position: "fixed",
        bottom: 50,
        left: "65%",
        transform: "translate(-50%, -50%)",
      }}
    />
  ) : (
    <Button
      id="createBlogButton"
      type="submit"
      sx={{
        backgroundColor: colors.black,
        color: colors.beige,
        marginTop: "30px",
        marginBottom: "20px",
        height: "50px",
        width: "300px",
        borderRadius: "10px",
        ":hover": {
          backgroundColor: `${colors.green}`,
        },
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
        bottom: 50,
        left: "35%",
        transform: "translate(-50%, -50%)",
      }}
    />
  ) : (
    <Button
      type="button"
      onClick={handleClick}
      sx={{
        backgroundColor: colors.black,
        color: colors.beige,
        height: "50px",
        width: "300px",
        borderRadius: "10px",
        ":hover": {
          backgroundColor: `${colors.red}`,
        },
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
