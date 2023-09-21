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
    updateBlog: (state, action) => {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      );
    },
    removeBlog: (state, action) => {
      const removedBlog = action.payload;
      return state.filter((blog) => blog.id !== removedBlog.id);
    },
  },
});

export default blogsSlice.reducer;
export const { getBlogs, saveBlog, updateBlog, removeBlog } =
  blogsSlice.actions;

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

export const likeBlog = (blogToLike) => {
  return async (dispatch) => {
    const likedBlog = await blogService.updateBlog(blogToLike);
    dispatch(updateBlog(likedBlog));
  };
};

export const deleteBlog = (blogToRemove) => {
  return async (dispatch) => {
    const removedBlog = await blogService.removeBlog(blogToRemove);
    dispatch(removeBlog(blogToRemove));
    return removedBlog;
  };
};

export const addComment = (blogToUpdate, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(blogToUpdate, comment);
    dispatch(updateBlog(updatedBlog));
  };
};
