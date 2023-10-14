import CopyrightIcon from "@mui/icons-material/Copyright";
import { copyrightStyle, appNameStyle } from "../styles/styles";

const Trademark = () => {
  return (
    <>
      <span className="appName" style={appNameStyle}>
        BlogBinder
      </span>
      <div style={copyrightStyle}>
        <CopyrightIcon sx={{ fontSize: "15px" }} /> {"  "}2023 BlogBinder
      </div>
    </>
  );
};

export default Trademark;
