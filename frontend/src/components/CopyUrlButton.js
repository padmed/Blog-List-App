import LinkIcon from "@mui/icons-material/Link";
import { IconButton } from "@mui/material";
import clipboardCopy from "clipboard-copy";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const CopyUrlButton = () => {
  const dispatch = useDispatch();

  const handleCopyUrl = () => {
    clipboardCopy(window.location.href)
      .then(() => {
        dispatch(setNotification("URL copied to clipboard", true));
      })
      .catch(() => {
        dispatch(setNotification("Couldn't copy URL"), false);
      });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={handleCopyUrl}>
        <LinkIcon id="linkIcon" style={{ color: "black" }} />
      </IconButton>
      <label htmlFor={"linkIcon"}>Copy URL</label>
    </div>
  );
};

export default CopyUrlButton;
