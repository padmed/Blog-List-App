import PropTypes from "prop-types";
import { wrongPasswordStyle } from "../styles/styles";

const PasswordMissmatch = ({ password, repeatPassword }) => {
  return repeatPassword !== "" && password !== repeatPassword ? (
    <span style={wrongPasswordStyle}>Passwords do not match</span>
  ) : (
    <span style={wrongPasswordStyle}></span>
  );
};

PasswordMissmatch.propTypes = {
  password: PropTypes.string.isRequired,
  repeatPassword: PropTypes.string.isRequired,
};

export default PasswordMissmatch;
