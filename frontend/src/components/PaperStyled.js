import { Paper } from "@mui/material";
import PropTypes from "prop-types";

const PaperStyled = (props) => {
  return (
    <Paper
      elevation={6}
      sx={{
        border: "2px solid",
        width: "80%",
        minWidth: "350px",
      }}
    >
      {props.children}
    </Paper>
  );
};

PaperStyled.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PaperStyled;
