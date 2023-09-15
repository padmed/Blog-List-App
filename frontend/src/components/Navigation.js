import { Link } from "react-router-dom";

const Navigation = () => {
  const style = {
    paddingRight: "10px",
  };

  return (
    <div>
      <Link style={style} to={"/"}>
        Blogs
      </Link>
      <Link style={style} to={"/users"}>
        Users
      </Link>
    </div>
  );
};

export default Navigation;
