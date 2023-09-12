/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import LoginForm from "./components/LogInForm";
import UserInApp from "./components/UserInApp";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import TogglableForm from "./components/TogglableForm";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogReducer";
import { login } from "./reducers/userReducer";

function App() {
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const blogFormRef = useRef("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  useEffect(() => {
    let userInStorage = window.localStorage.getItem("loggedUser");

    if (userInStorage) {
      userInStorage = JSON.parse(userInStorage);
      dispatch(login(userInStorage));
      blogService.setToken(userInStorage.token);
    }
  }, []);

  if (!user)
    return (
      <>
        {notification.status === false && <Notification />}
        <LoginForm />
      </>
    );

  return (
    <div>
      <h2>Blogs</h2>
      {notification.status !== null && <Notification />}
      <UserInApp name={user.name} />
      <TogglableForm buttonLabel="Add new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </TogglableForm>
      <Blogs />
    </div>
  );
}

export default App;
