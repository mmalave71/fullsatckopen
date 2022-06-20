import React,{ useState } from 'react'
import PropTypes from 'prop-types'


const BlogDetails =  ({ blog,handleLike,user,handleRemoveBlog }) => {

  const [likes,setLikes]=useState(blog.likes)

  const onClickLikes=() => {

    if (blog.user.username===user.username){
      setLikes(likes+1)
      blog.likes=blog.likes+1
    }
    handleLike(blog)
  }

  const onClickRemove=() => {
    handleRemoveBlog(blog)
  }

  return (
    <>
      <br/>
      {blog.url}
      <br/>
               likes: {likes} <button onClick={onClickLikes}> like </button>
      <br/>
      {blog.user.name}
      <br/>
      { (blog.user.username===user.username)?  <button onClick={onClickRemove}>  remove </button> : null }
    </>
  )
}
BlogDetails.propTypes={
  blog:PropTypes.object.isRequired,
  handleLike:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
  handleRemoveBlog:PropTypes.func.isRequired
}
export default BlogDetails