import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (value) => {
  token = `bearer ${value}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = async (newBlog) => {
  const config = {
    headers: { authorization: token },
  };
  const request = await axios.post(baseUrl, newBlog, config);
  return request.data;
};

const updateBlog = async (updatedBlog) => {
  const blogId = updatedBlog.id;
  const request = await axios.put(`${baseUrl}/${blogId}`, updatedBlog);
  return request.data;
};

const removeBlog = async (id) => {
  const config = {
    headers: { authorization: token },
  };

  const removedBlog = await axios.delete(`${baseUrl}/${id}`, config);
  return removedBlog.data;
};

export default { getAll, addBlog, setToken, updateBlog, removeBlog };
