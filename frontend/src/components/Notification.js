const Notification = (props) => {
  const failed = {
    border: "4px solid red",
    color: "#8B0000",
    backgroundColor: "#ffb2b2",
    margin: "5px",
    padding: "5px",
    borderRadius: "5px",
  };
  const success = {
    border: "4px solid green",
    color: "green",
    backgroundColor: "#aaf0d1",
    margin: "5px",
    padding: "5px",
    borderRadius: "5px",
  };

  const style = props.notification.status ? success : failed;

  return (
    <div style={style}>
      <h3>{props.notification.message}</h3>
    </div>
  );
};

export default Notification;
