import PropTypes from 'prop-types'


const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <form onSubmit={handleLogin} id='login-form'>
        <div>
          username
          <input
            type='text'
            value={username}
            name='username'
            id='username'
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </div>
        <div>
          password
          <input
            type='text'
            value={password}
            name='password'
            id='password'
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </div>
        <button type='submit' id='login-button'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm