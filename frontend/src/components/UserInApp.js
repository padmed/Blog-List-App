const UserInApp = (props) => {
  return (
    <p>
      {`Logged in as ${props.name} `}
      <button type="submit" onClick={props.handleLogout}>
        Log out
      </button>
    </p>
  );
};

export default UserInApp;
