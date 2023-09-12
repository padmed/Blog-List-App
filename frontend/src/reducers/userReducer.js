import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

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
    dispatch(login(loggedInUser));
    return loggedInUser;
  };
};
