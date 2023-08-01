import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LogInForm";
import loginService from "./services/login";
import UserInApp from "./components/UserInApp";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import TogglableForm from "./components/TogglableForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: "",
    status: null,
  });
  const blogFormRef = useRef("miau");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userInStorage = window.localStorage.getItem("loggedUser");

    if (userInStorage) {
      const user = JSON.parse(userInStorage);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLoggedUser = async (user) => {
    const { username, password } = user;
    try {
      const user = await loginService.getUser({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      showNotification(`${user.name} is logged in`, true);
    } catch (e) {
      showNotification(`Invalid username or password`, false);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    blogService.setToken(null);
    window.localStorage.clear();
  };

  const saveNewBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.addBlog(newBlog);
      addedBlog.temporaryName = user.name;
      setBlogs([...blogs, addedBlog]);
      showNotification(`A new blog "${addedBlog.title}" added`, true);
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      const error = e.response.data.errorMessage;
      console.log(e);
      showNotification(error, false);
    }
  };

  const showNotification = (message, status) => {
    setNotification({ message, status });
    setTimeout(() => {
      setNotification({ message: "", status: null });
    }, 1500);
  };

  const updateBlog = async (blog) => {
    const updatedBlog = await blogService.updateBlog(blog);
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === updatedBlog.id) {
        return (blog = updatedBlog);
      }
      return blog;
    });

    setBlogs(updatedBlogs);
  };

  if (!user)
    return (
      <>
        {notification.status === false && (
          <Notification notification={notification} />
        )}
        <LoginForm handleLoggedUser={handleLoggedUser} />
      </>
    );

  return (
    <div>
      <h2>blogs</h2>
      {notification.status !== null && (
        <Notification notification={notification} />
      )}
      <UserInApp name={user.name} handleLogout={handleLogout} />
      <TogglableForm buttonLabel={"Add new blog"} ref={blogFormRef}>
        <BlogForm saveNewBlog={saveNewBlog} />
      </TogglableForm>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
        ))}
    </div>
  );
};

export default App;