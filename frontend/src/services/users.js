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

const addUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { findUser, getUsers, addUser };
