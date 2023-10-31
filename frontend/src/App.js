/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LogInForm";
import Notification from "./components/Notification";
import UsersView from "./views/UsersView";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogReducer";
import { login } from "./reducers/userReducer";
import { Routes, Route, Navigate } from "react-router-dom";
import IndividualUserView from "./views/IndividualUser";
import { initUsers } from "./reducers/allUsersReducer";
import BlogsView from "./views/BlogsView";
import IndividualBlogView from "./views/IndividualBlog";
import { loginPageStyle } from "./styles/styles";
import SignUpForm from "./components/SignUpForm";
import NavigationBar from "./components/NavigationBar";
import useIsMobile from "./hooks/useIsMobile";
import BottomNavigationBar from "./components/BottomNavigationBar";
import { loginPageLayout } from "./styles/layoutStyles";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

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
      <div style={{ ...loginPageStyle, ...loginPageLayout }}>
        <Notification />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
    );

  return (
    <div>
      <header>
        <div>
          <NavigationBar />
        </div>
        <Notification />
      </header>

      <Routes>
        <Route path="/users/:id" element={<IndividualUserView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/blogs/:id" element={<IndividualBlogView />} />
        <Route path="/" element={<BlogsView />} />
      </Routes>
      <footer>{isMobile && <BottomNavigationBar />}</footer>
    </div>
  );
}

export default App;
