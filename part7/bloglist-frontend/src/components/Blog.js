import React from 'react'
import { Link } from 'react-router-dom'
//import BlogDetails from './BlogDetails'
import PropTypes from 'prop-types'


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}



const Blog = ({ blog }) => {


  return (
    <div style={blogStyle} className='bloglist'>
      <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author}</Link>

    </div>
  )
}
Blog.propTypes={
  blog:PropTypes.object.isRequired
}
export default Blog