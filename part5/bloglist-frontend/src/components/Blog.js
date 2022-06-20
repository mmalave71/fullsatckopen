import React,{ useState } from 'react'
import BlogDetails from './BlogDetails'
import PropTypes from 'prop-types'


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}



const Blog = ({ blog,handleLike,user,handleRemoveBlog }) => {
  const [view,setView]=useState(false)

  const handleView=() => {
    setView(!view)
  }

  return (
    <div style={blogStyle} className='bloglist'>
      {blog.title} {blog.author}
      <button onClick={handleView}> {view? 'hide':'view'} </button>
      { (view)?
        <BlogDetails  blog={blog}   handleLike={handleLike} user={user} handleRemoveBlog={handleRemoveBlog}/>
        :
        null
      }

    </div>
  )
}
Blog.propTypes={
  blog:PropTypes.object.isRequired,
  handleLike:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
  handleRemoveBlog:PropTypes.func.isRequired
}
export default Blog