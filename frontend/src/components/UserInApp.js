import PropTypes from 'prop-types'

function UserInApp(props) {
  return (
    <p>
      {`Logged in as ${props.name} `}
      <button type="submit" onClick={props.handleLogout}>
        Log out
      </button>
    </p>
  )
}

UserInApp.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default UserInApp
