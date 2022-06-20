import React,{ useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  const onChangeTitle =(event) => {
    setTitle(event.target.value)
  }
  const onChangeAuthor =(event) => {
    setAuthor(event.target.value)
  }
  const onChangeUrl =(event) => {
    setUrl(event.target.value)
  }

  const onSubmitBlog = async (event) => {
    event.preventDefault()
    const objBlog={ title,author,url }
    //console.log('objBlog',objBlog)
    try {
      await createBlog(objBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch(error){
      console.log('error en onSubmit',error.response.data.error)
    }

  }

  return (
    <form onSubmit={ onSubmitBlog}>
      <h2> Create new </h2>
              title
      <input id='title' type="text" value={title} onChange={ onChangeTitle}/>
      <br/>
              author
      <input id='author' type='text' value={author} onChange={ onChangeAuthor}/>
      <br/>
              url
      <input id='url' type='text' style={{ width:500 }} value={url} onChange={ onChangeUrl}/>
      <br/>
      <button> create</button>
    </form>
  )
}
BlogForm.propTypes={
  createBlog:PropTypes.func.isRequired
}

export default BlogForm