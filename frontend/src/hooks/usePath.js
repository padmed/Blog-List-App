import { useLocation } from "react-router-dom";

const usePath = () => {
  const location = useLocation();
  const path = location.pathname;

  return path;
};

export default usePath;
