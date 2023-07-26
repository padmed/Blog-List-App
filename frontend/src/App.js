import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LogInForm";
import loginService from "./services/login";
import UserInApp from "./components/UserInApp";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleInputChange = (setState) => (event) => {
    const inputValue = event.target.value;
    setState(inputValue);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.getUser({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log("invalid credentials");
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.clear();
  };

  if (!user)
    return (
      <LoginForm
        handleUsernameChange={handleInputChange(setUsername)}
        handlePasswordChange={handleInputChange(setPassword)}
        handleLogin={handleLogin}
        usernameValue={username}
        passwordValue={password}
      />
    );

  return (
    <div>
      <h2>blogs</h2>
      <UserInApp name={user.name} handleLogout={handleLogout} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
