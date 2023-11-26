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
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import { ROUTES } from "./utils/config";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let userInStorage = window.localStorage.getItem("loggedUser");

    if (userInStorage) {
      userInStorage = JSON.parse(userInStorage);
      dispatch(login(userInStorage));
      blogService.setToken(userInStorage.token);
    }

    dispatch(initBlogs());
    dispatch(initUsers());
  }, []);

  useEffect(() => {
    if (location.pathname === "/users") {
      navigate("/users");
    } else if (location.pathname.includes("/blogs/")) {
      const id = location.pathname.replace("/blogs/", "");
      navigate(`/blogs/${id}`);
    }
  }, [location.pathname]);

  if (!user)
    return (
      <div style={{ ...loginPageStyle, ...loginPageLayout }}>
        <Notification />
        <Routes>
          <Route path={ROUTES.HOME} element={<LoginForm />} />
          <Route path={ROUTES.SIGNUP} element={<SignUpForm />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
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
        <Route path={ROUTES.USER_DETAILS} element={<IndividualUserView />} />
        <Route path={ROUTES.USERS} element={<UsersView />} />
        <Route path={ROUTES.BLOG_DETAILS} element={<IndividualBlogView />} />
        <Route path={ROUTES.HOME} element={<BlogsView />} />
      </Routes>
      <footer>{isMobile && <BottomNavigationBar />}</footer>
    </div>
  );
}

export default App;
