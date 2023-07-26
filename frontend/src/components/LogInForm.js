const LoginForm = (props) => {
  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={props.handleLogin}>
        <div>
          <label>username</label>
          <input
            onChange={props.handleUsernameChange}
            value={props.usernameValue}
          ></input>
        </div>
        <div>
          <label>password</label>
          <input
            onChange={props.handlePasswordChange}
            value={props.passwordValue}
          ></input>
        </div>
        <button type="submit">log in</button>
      </form>
    </>
  );
};

export default LoginForm;
