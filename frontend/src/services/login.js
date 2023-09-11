import axios from "axios";

const getUser = async (credentials) => {
  const response = await axios.post("/api/login", credentials);
  return response.data;
};

export default { getUser };
