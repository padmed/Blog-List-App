import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    getUsers: (state, action) => {
      return action.payload;
    },
  },
});

export const { getUsers } = allUsersSlice.actions;

export const initUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers();
    dispatch(getUsers(users));
  };
};

export default allUsersSlice.reducer;
