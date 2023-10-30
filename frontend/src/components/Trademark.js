import CopyrightIcon from "@mui/icons-material/Copyright";
import { copyrightStyle } from "../styles/styles";
import { copyrightLayout, appNameLayout } from "../styles/layoutStyles";

const Trademark = () => {
  return (
    <>
      <span className="appName" style={appNameLayout}>
        BlogBinder
      </span>
      <div style={{ ...copyrightStyle, ...copyrightLayout }}>
        <CopyrightIcon sx={{ fontSize: "15px" }} /> {"  "}2023 BlogBinder
      </div>
    </>
  );
};

export default Trademark;
