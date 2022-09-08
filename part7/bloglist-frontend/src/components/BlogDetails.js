import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateBlog,removeBlog,addComment } from '../reducers/blogReducer'
//import { Link } from 'react-router-dom'

const BlogDetails =  ({ blog,user }) => {

  const [likes,setLikes]=useState(blog.likes)
  const [comments,setComments]=useState(blog.comments)
  const dispatch=useDispatch()

  const handleLike= async( blog) => {
    dispatch(updateBlog(blog))
  }

  const handleRemoveBlog= async (blog) => {
    if (window.confirm(`remove the blog ${blog.title} by ${blog.author} ?`)) {
      dispatch(removeBlog(blog.id))
    }
  }
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

  const addComments= (event ) => {
    event.preventDefault()
    const comment=event.target.comment.value
    event.target.comment.value=''
    setComments(comments.concat(comment))
    dispatch(addComment(blog,comment))
  }

  return (
    <>
      <br/>
      <a href={blog.url}> {blog.url} </a>
      <br/>
               likes: {likes} <button onClick={onClickLikes}> like </button>
      <br/>
      added by {blog.user.name}
      <br/>
      { (blog.user.username===user.username)?  <button onClick={onClickRemove}>  remove </button> : null }
      <br/>
      <h3>comments</h3>
      <form onSubmit={addComments}>
        <input id='comment'  type='text'/>
        <button > add comments</button>
      </form>

      <ul>{comments.map(comment => <li key={comment}> {comment} </li>)}</ul>
    </>
  )
}
BlogDetails.propTypes={
  blog:PropTypes.object.isRequired,
  user:PropTypes.object.isRequired
}
export default BlogDetails