import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, payload) => {
      return payload.payload;
    },
    logout: () => {
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const loggedInUser = await loginService.getUser({ username, password });
    window.localStorage.setItem("loggedUser", JSON.stringify(loggedInUser));
    blogService.setToken(loggedInUser.token);
    dispatch(login(loggedInUser));
    return loggedInUser;
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logout());
    blogService.setToken(null);
    window.localStorage.clear();
  };
};
