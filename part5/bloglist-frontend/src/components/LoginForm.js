import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username,password,handleLogin,onChangeUserName,onChangePassword }) => {

  return (
    <form id='loginform' onSubmit ={ handleLogin}>
      <h2>Log into application </h2>
              Username
      <input id='username' type="text" value={username} onChange={ onChangeUserName }/>
      <br/>
              Password
      <input id='password' type="password" value={password} onChange={ onChangePassword}/>
      <br/>
      <button id='login-button'> Login </button>
    </form>
  )
}
LoginForm.propTypes = {
  username:PropTypes.string.isRequired,
  password:PropTypes.string.isRequired,
  handleLogin:PropTypes.func.isRequired,
  onChangeUserName:PropTypes.func.isRequired,
  onChangePassword:PropTypes.func.isRequired
}
export default LoginForm