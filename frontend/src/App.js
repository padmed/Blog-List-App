/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LogInForm";
import loginService from "./services/login";
import UserInApp from "./components/UserInApp";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import TogglableForm from "./components/TogglableForm";
import userService from "./services/users";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogReducer";

function App() {
  const blogs = useSelector((state) => state.blogs);
  const [user, setUser] = useState(null);
  const notification = useSelector((state) => state.notification);
  const blogFormRef = useRef("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let userInStorage = window.localStorage.getItem("loggedUser");

    if (userInStorage) {
      userInStorage = JSON.parse(userInStorage);
      setUser(userInStorage);
      blogService.setToken(userInStorage.token);
    }
  }, []);

  const handleLoggedUser = async (userToLogin) => {
    const { username, password } = userToLogin;
    try {
      const loggedUser = await loginService.getUser({ username, password });
      // eslint-disable-next-line no-undef
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      dispatch(setNotification(`${loggedUser.name} is logged in`, true));
    } catch (e) {
      dispatch(setNotification("Invalid username or password", false));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    blogService.setToken(null);
    // eslint-disable-next-line no-undef
    window.localStorage.clear();
  };

  const updateBlog = async (blogToUpdate) => {
    // const updatedBlog = await blogService.updateBlog(blogToUpdate);
    // const updatedBlogsState = blogs.map((blog) => {
    //   if (blog.id === updatedBlog.id) {
    //     const updated = updatedBlog;
    //     return updated;
    //   }
    //   return blog;
    // });
    // setBlogs(updatedBlogsState);
  };

  const removeBlog = async (blogToRemove) => {
    // eslint-disable-next-line no-undef
    // const confirmation = window.confirm(`Delete ${blogToRemove.title}?`);
    // try {
    //   if (confirmation) {
    //     await blogService.removeBlog(blogToRemove.id);
    //     const filteredBlogs = blogs.filter(
    //       (blog) => blog.id !== blogToRemove.id,
    //     );
    //     setBlogs(filteredBlogs);
    //     dispatch(setNotification("Deleted Succesfully", true));
    //   }
    // } catch (e) {
    //   const error = "Couldn't delete a blog";
    //   dispatch(setNotification(error, false));
    // }
  };

  if (!user)
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <>
        {notification.status === false && <Notification />}
        <LoginForm handleLoggedUser={handleLoggedUser} />
      </>
    );

  return (
    <div>
      <h2>Blogs</h2>
      {notification.status !== null && <Notification />}
      <UserInApp name={user.name} handleLogout={handleLogout} />
      <TogglableForm buttonLabel="Add new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </TogglableForm>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
    </div>
  );
}

export default App;
