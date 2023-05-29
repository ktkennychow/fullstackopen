import PropTypes from 'prop-types'
import {
  TextField,
  Button
} from '@mui/material'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <form onSubmit={handleLogin} id='login-form'>
        <div>
          <TextField
            sx={{ mt: 1 }}
            label="username"
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
          <TextField
            sx={{ mt: 1 }}
            label="password"
            type='text'
            value={password}
            name='password'
            id='password'
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </div>
        <Button type='submit' id='login-button' sx={{ mt: 1 }} variant="contained" color="primary">login</Button>
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