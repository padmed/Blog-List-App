import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLoggedUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    handleLoggedUser({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
        </div>
        <div>
          <label>password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <button type="submit">log in</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLoggedUser: PropTypes.func.isRequired
}

export default LoginForm
