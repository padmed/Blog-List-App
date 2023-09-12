import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import userService from "../services/users";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    getBlogs: (state, action) => {
      return action.payload;
    },
    saveBlog: (state, action) => {
      const newBlog = action.payload;
      return [...state, newBlog];
    },
  },
});

export default blogsSlice.reducer;
export const { getBlogs, saveBlog } = blogsSlice.actions;

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(getBlogs(blogs));
  };
};

export const saveNewBlog = (blogToSave) => {
  return async (dispatch) => {
    const savedBlog = await blogService.addBlog(blogToSave);
    const userId = savedBlog.user;
    const createdBy = await userService.findUser(userId);
    savedBlog.user = {
      username: createdBy.username,
      name: createdBy.name,
      id: createdBy.id,
    };
    dispatch(saveBlog(savedBlog));
    return savedBlog;
  };
};
