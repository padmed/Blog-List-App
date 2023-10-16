import usePasswordVisibility from "../hooks/usePasswordVisibility";
import { TextField } from "@mui/material";
import { inputStyle } from "../styles/styles";
import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";
import ValidationInfo from "./ValidationInfo";

const PasswordField = ({ fieldProps, label, inputError }) => {
  const passwordVisibility = usePasswordVisibility();

  return (
    <TextField
      {...fieldProps}
      type={passwordVisibility.visibility ? "text" : "password"}
      label={label}
      style={inputStyle}
      autoComplete="new-password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {passwordVisibility.component}
            <ValidationInfo
              inputError={inputError}
              inputValue={fieldProps.value}
            />
          </InputAdornment>
        ),
      }}
      error={inputError}
    ></TextField>
  );
};

PasswordField.propTypes = {
  fieldProps: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  inputError: PropTypes.bool.isRequired,
};

export default PasswordField;
