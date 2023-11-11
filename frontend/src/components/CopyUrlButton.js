import LinkIcon from "@mui/icons-material/Link";
import { IconButton } from "@mui/material";
import clipboardCopy from "clipboard-copy";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { blackToOrangeIcon } from "../styles/styles";
import { copyUrlLayout } from "../styles/layoutStyles";

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
    <div style={{ ...copyUrlLayout }}>
      <IconButton onClick={handleCopyUrl} sx={{ ...blackToOrangeIcon }}>
        <LinkIcon id="linkIcon" />
      </IconButton>
      <label htmlFor={"linkIcon"}>Copy URL</label>
    </div>
  );
};

export default CopyUrlButton;
