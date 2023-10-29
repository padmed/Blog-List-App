import ButtonRoundMobile from "./ButtonRoundMobile";
import PropTypes from "prop-types";

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
    <button onClick={handleClick}>Create</button>
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
    <button id="createBlogButton" type="submit">
      Create
    </button>
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
    <button type="button" onClick={handleClick}>
      Cancel
    </button>
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
