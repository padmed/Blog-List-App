const UserInApp = (props) => {
  return (
    <p>
      {`logged in as ${props.name} `}
      <button type="submit" onClick={props.handleLogout}>
        log out
      </button>
    </p>
  );
};

export default UserInApp;
