import CopyrightIcon from "@mui/icons-material/Copyright";

const Trademark = () => {
  return (
    <>
      <span className="appName" style={{ marginTop: "35px" }}>
        BlogBinder
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "rgba(0,0,0,0.5)",
          fontSize: "15px",
          marginTop: "5px",
        }}
      >
        <CopyrightIcon sx={{ fontSize: "15px" }} /> {"  "}2023 BlogBinder
      </div>
    </>
  );
};

export default Trademark;
