import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import useIsMobile from "../hooks/useIsMobile";
import ButtonRoundMobile from "./ButtonRoundMobile";

const TogglableForm = forwardRef((props, refs) => {
  const [visible, setVisibility] = useState(false);
  const isMobile = useIsMobile();

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisibility(!visible);

  const submitButton = (
    <ButtonRoundMobile
      handleClick={toggleVisibility}
      type="submit"
      position={{
        position: "fixed",
        bottom: 40,
        left: "60%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );

  useImperativeHandle(refs, () => {
    return { toggleVisibility, submitButton };
  });

  if (isMobile) {
    return (
      <div>
        <div style={hideWhenVisible}>
          <ButtonRoundMobile
            handleClick={toggleVisibility}
            type="add"
            position={{
              position: "fixed",
              bottom: 40,
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <ButtonRoundMobile
            handleClick={toggleVisibility}
            type="cancel"
            position={{
              position: "fixed",
              bottom: 40,
              left: "40%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

TogglableForm.displayName = "ToggableForm";
TogglableForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default TogglableForm;
