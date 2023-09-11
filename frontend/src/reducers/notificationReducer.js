import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    status: null,
  },
  reducers: {
    writeNotification: (state, action) => {
      const message = action.payload.message;
      const status = action.payload.status;
      return { message, status };
    },
    hideNotification: () => {
      return { message: "", status: null };
    },
  },
});

export default notificationSlice.reducer;
export const { writeNotification, hideNotification } =
  notificationSlice.actions;

export const setNotification = (message, status) => {
  return (dispatch) => {
    dispatch(writeNotification({ message, status }));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 1500);
  };
};
