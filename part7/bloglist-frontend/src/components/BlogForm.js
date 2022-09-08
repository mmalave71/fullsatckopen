import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { Form,Button } from 'react-bootstrap'

const BlogForm = ({ blogFormRef }) => {
  const dispatch =useDispatch()

  const createBlog =async (objBlog) => {

    dispatch(addBlog(objBlog))
    blogFormRef.current.toggleVisibility()

  }
  const onSubmitBlog = async (event) => {
    event.preventDefault()

    const objBlog={ title:event.target.title.value,
      author:event.target.author.value,
      url:event.target.url.value }

    try {
      await createBlog(objBlog)
      event.target.title.value=''
      event.target.author.value=''
      event.target.url.value=''

    }
    catch(error){
      console.log('error en onSubmit',error.response.data.error)
      createBlog(objBlog)
    }

  }

  return (
    <Form onSubmit={ onSubmitBlog}>
      <Form.Group>
        <h2> Create new </h2>
        <Form.Label> title</Form.Label>
        <Form.Control id='title' type="text" />
        <Form.Label> author </Form.Label>
        <Form.Control id='author' type='text' />
        <Form.Label> url</Form.Label>
        <Form.Control id='url' type='text' />
        <Button type='submit' variant='primary'> create</Button>
      </Form.Group>
    </Form>
  )
}
BlogForm.propTypes={
  blogFormRef:PropTypes.object.isRequired
}

export default BlogForm