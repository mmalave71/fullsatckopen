import loginService from '../services/login'
import blogService from '../services/blogs'

import { createNotification } from './notificationReducer'
import { setTypeNotification } from './notificationTypeReducer'

export const createUser = ( username , password) => {

  return async dispatch => {
    try {
      const loggedUser = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBloglistappUser',JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      dispatch({ type:'SET_USER',data:loggedUser })
    }
    catch(error)
    {
      dispatch(setTypeNotification('ERROR'))
      dispatch(createNotification('wrong credentials',3000))
    }

  }
}

export const getUser = () => {
  let objLoggedUser=null
  const loggedUser= window.localStorage.getItem('loggedBloglistappUser')

  if (loggedUser) {
    objLoggedUser=JSON.parse(loggedUser)
    blogService.setToken(objLoggedUser.token)
  }
  return ({ type:'SET_USER',data:objLoggedUser })
}


export const clearUser = () => {
  window.localStorage.removeItem('loggedBloglistappUser')
  return({ type:'CLEAR_USER',data:null })
}
const userReducer =(state=null,action ) => {
  switch(action.type){
  case 'SET_USER': return action.data
  case 'CLEAR_USER': return null
  default: return state
  }
}
export default userReducer