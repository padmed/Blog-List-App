/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LogInForm";
import UserInApp from "./components/UserInApp";
import Notification from "./components/Notification";
import UsersView from "./views/Users";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogReducer";
import { login } from "./reducers/userReducer";
import { Routes, Route } from "react-router-dom";
import IndividualUserView from "./views/IndividualUser";
import { initUsers } from "./reducers/allUsersReducer";
import BlogsView from "./views/Blogs";
import IndividualBlogView from "./views/IndividualBlog";
import Navigation from "./components/Navigation";
import Paper from "@mui/material/Paper";
import { loginPageStyle, loginContainerStyle } from "./styles/loginPage";

function App() {
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());
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
      <div style={loginPageStyle}>
        {notification.status === false && <Notification />}
        <Paper elevation={12} style={loginContainerStyle}>
          <LoginForm />
        </Paper>
      </div>
    );

  return (
    <div>
      <header>
        <div>
          <Navigation />
          <UserInApp name={user.name} />
        </div>

        <h2>Blogs</h2>
        {notification.status !== null && <Notification />}
      </header>

      <Routes>
        <Route path="/users/:id" element={<IndividualUserView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/blogs/:id" element={<IndividualBlogView />} />
        <Route path="/" element={<BlogsView />} />
      </Routes>
    </div>
  );
}

export default App;
