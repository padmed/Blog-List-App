import axios from "axios";
const baseUrl = "/api/users";

const findUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { findUser, getUsers };
