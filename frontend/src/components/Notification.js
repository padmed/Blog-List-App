import { useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const type = notification.status ? "success" : "error";

  if (notification.status === null) {
    return <div style={{ height: "40px" }}></div>;
  }

  return (
    <div style={{ height: "40px" }}>
      <MuiAlert variant="filled" severity={type}>
        {notification.message}
      </MuiAlert>
    </div>
  );
};

export default Notification;
