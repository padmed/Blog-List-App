import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LogInForm";
import loginService from "./services/login";
import UserInApp from "./components/UserInApp";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import TogglableForm from "./components/TogglableForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: "",
    status: null,
  });
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userInStorage = window.localStorage.getItem("loggedUser");

    if (userInStorage) {
      const user = JSON.parse(userInStorage);
      setUser(user);
    }
  }, []);

  const handleBlogInputChange = (event) => {
    const propertyToChange = event.target.id;
    const valueToChange = event.target.value;

    if (propertyToChange in newBlog) {
      setNewBlog({ ...newBlog, [propertyToChange]: valueToChange });
    }
  };

  const handleLoggedUser = async (user) => {
    const { username, password } = user;
    try {
      const user = await loginService.getUser({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      showNotification(`${user.name} is logged in`, true);
    } catch (e) {
      showNotification(`Invalid username or password`, false);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.clear();
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const addedBlog = await blogService.addBlog(newBlog, user.token);
      setBlogs([...blogs, addedBlog]);
      showNotification(`A new blog "${addedBlog.title}" added`, true);
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
      <TogglableForm buttonLabel={"Add new blog"}>
        <CreateBlogForm
          inputValues={newBlog}
          handleInputChange={handleBlogInputChange}
          handleCreateBlog={handleCreateBlog}
        />
      </TogglableForm>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
