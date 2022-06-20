import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [user,setUser]=useState(null)
  const [ sucessfull, setSuccesfull] =useState('')
  const [error,setError]=useState('')


  const onChangeUserName=(event) => {
    setUsername(event.target.value)
  }
  const onChangePassword =(event) => {
    setPassword(event.target.value)
  }


  const hookUser = () => {
    const loggedUser= window.localStorage.getItem('loggedBloglistappUser')
    //console.log('loggedUser in hook',loggedUser)
    //console.log('loggedUser in hook parseado',JSON.parse(loggedUser))
    if (loggedUser) {
      const objLoggedUser=JSON.parse(loggedUser)
      setUser(objLoggedUser)
      blogService.setToken(objLoggedUser.token)
    }

  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      //console.log('loggedUser',loggedUser)
      window.localStorage.setItem('loggedBloglistappUser',JSON.stringify(loggedUser))
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      setUsername('')
      setPassword('')
    }
    catch(error){
      console.log('error=',error.response.data.error)
      console.log('wrong credentials')
      setError('wrong credentials')
      setTimeout(() => {setError('')},3000)
    }

  }

  const handleLogout =() => {
    window.localStorage.removeItem('loggedBloglistappUser')
    setUser(null)
  }
  const createBlog =async (objBlog) => {
    try{
      const blogInDb = await blogService.create(objBlog)
      const blog= await  blogService.getBlog(blogInDb.id)
      setBlogs(blogs.concat(blog))

      blogFormRef.current.toggleVisibility()
      setSuccesfull(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => { setSuccesfull('')},3000)
    }
    catch(error){
      console.log('error=',error.response.data.error)
      setError(error.response.data.error)
      setTimeout(() => {setError('')},3000)
    }

  }
  const handleLike= async( blog) => {

    try {
      const newBlog={ title:blog.title, author:blog.author,url:blog.url,likes:blog.likes }
      await blogService.update(blog.id,newBlog)
    }
    catch(error){
      console.log('error=',error.response.data.error)
      setError(error.response.data.error)
      setTimeout(() => {setError('')},3000)
    }

  }
  const handleRemoveBlog= async (blog) => {

    try{

      console.log('remove a',blog.id,blog.title )
      if (window.confirm(`remove the blog ${blog.title} by ${blog.author} ?`)) {
        await blogService.deleteBlog(blog.id)
        setBlogs( blogs.filter(b => b.id!==blog.id) )
      }

    }catch(error){
      console.log('error=',error.response.data.error)
      setError(error.response.data.error)
      setTimeout(() => {setError('')},3000)
    }
  }
  const loginForm = () => {
    return (
      <LoginForm username={username} password={password}
        handleLogin={handleLogin} onChangeUserName={onChangeUserName}
        onChangePassword={onChangePassword} />
    )
  }
  const blogFormRef=useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm   createBlog={createBlog} />
      </Togglable>

    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(hookUser,[])

  blogs.sort( (a,b) => a.likes>=b.likes?-1:1)

  return (
    <div>
      <Notification message={sucessfull} type='exito'/>
      <Notification message={error} type='error'/>
      <h2>blogs</h2>
      {(user === null) ?
        loginForm()
        : <div>{user.name} logged in
          <br />
          <button onClick={handleLogout}> Logout </button>
          {blogForm()}
          {blogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} user={user} handleRemoveBlog={handleRemoveBlog}/>)}
        </div>
      }

    </div>
  )
}
export default App
