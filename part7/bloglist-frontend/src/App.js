import React, {  useEffect,useRef } from 'react'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User  from './components/User'

import './bootstrap.min.css'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { getUser, clearUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import { BrowserRouter as Router, Routes, Route, Link,useMatch } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'

const Root = () => {
  const dispatch =useDispatch()
  const hookUser = () => {
    dispatch(getUser())
  }

  const handleLogout =() => {
    dispatch(clearUser())
  }

  const loginForm = () => {
    return (<LoginForm  />)
  }
  const blogFormRef=useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm   blogFormRef={blogFormRef}/>
      </Togglable>

    )
  }

  const usersView = () => {
    return (
      <Users/>
    )
  }

  useEffect( () => {dispatch(initializeBlogs()) } ,[dispatch])
  useEffect(hookUser,[])
  useEffect( () => {dispatch(initializeUsers())},[dispatch])

  const blogs = useSelector(state => state.blogs)
  blogs.sort( (a,b) => a.likes>=b.likes?-1:1)

  const notification = useSelector( state => state.notification )
  const  typeNotification =useSelector(state => state.typeNotification)
  const sucessfull=typeNotification==='SUCESSFULL'? notification: ''
  const error= typeNotification==='ERROR'? notification:''

  const users = useSelector( state => state.users)
  const user=useSelector( state => state.user)

  let userForView=null
  const match=useMatch('/users/:id')

  if (!match) {
    userForView=null
  }
  else{
    const idUser=match.params.id
    userForView=users.find(user => user.id===idUser)
  }

  const matchBlog=useMatch('/blogs/:id')
  let blog=null
  if (matchBlog){
    const idBlog=matchBlog.params.id
    blog=blogs.find(b => b.id===idBlog)
  }

  return (
    <div>
      <Notification message={sucessfull} type='success'/>
      <Notification message={error} type='danger'/>
      <h2>blog app</h2>
      {(user === null) ?
        loginForm()
        :
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav.Link href="#" as="span">
                <Link  to='/'> blogs </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link  to='/users'> users </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <div style={{ color:'white' }}>
                  {user.name} logged in
                </div>
              </Nav.Link>
              <button onClick={handleLogout}> Logout </button>
            </Navbar.Collapse>
          </Navbar>
          <Routes>
            <Route path='/users/:id'  element={<User user={userForView}> </User>}>
            </Route>
            <Route path='/users' element={usersView()}/>
            <Route path='/blogs/:id' element={(blog)? <BlogDetails  blog={blog}    user={user} />:null}>

            </Route>
            <Route path='/' element={<>{blogForm()}{blogs.map(blog => <Blog key={blog.id} blog={blog}/> )}</>} />
          </Routes>
        </div>
      }

    </div>
  )
}
const App= () => {
  return (
    <div className='container'>
      <Router>
        <Root/>
      </Router>
    </div>
  )
}
export default App