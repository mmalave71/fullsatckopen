import React  from 'react'
//import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/userReducer'

import { Form,Button } from 'react-bootstrap'

const LoginForm = () => {

  const dispatch=useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(createUser(event.target.username.value,event.target.password.value))
    event.target.username.value=''
    event.target.password.value=''
  }
  return (
    <Form id='loginform' onSubmit ={ handleLogin}>
      <Form.Group>
        <h2>Log into application </h2>
        <Form.Label>Username</Form.Label>
        <Form.Control id='username' type="text" />
        <Form.Label>Password</Form.Label>
        <Form.Control id='password' type="password" />
        <Button id='login-button' type='submit'> Login </Button>
      </Form.Group>
    </Form>
  )
}
/*
LoginForm.propTypes = {

}
*/
export default LoginForm