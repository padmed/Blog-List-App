import usePasswordVisibility from "../hooks/usePasswordVisibility";
import { TextField } from "@mui/material";
import { inputStyle } from "../styles/styles";
import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";
import ValidationInfo from "./ValidationInfo";

const ValidatedTextField = ({
  fieldProps,
  label,
  inputError = false,
  style = inputStyle,
  autoComplete = "off",
}) => {
  const passwordVisibility = usePasswordVisibility();

  if (fieldProps.type === "password") {
    return (
      <TextField
        {...fieldProps}
        type={passwordVisibility.visibility ? "text" : "password"}
        label={label}
        style={style}
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
  }

  return (
    <TextField
      {...fieldProps}
      label={label}
      style={style}
      autoComplete={autoComplete}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ValidationInfo inputValue={fieldProps.value} />
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
};

ValidatedTextField.propTypes = {
  fieldProps: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  inputError: PropTypes.bool,
  style: PropTypes.object,
  autoComplete: PropTypes.string,
};
export default ValidatedTextField;
