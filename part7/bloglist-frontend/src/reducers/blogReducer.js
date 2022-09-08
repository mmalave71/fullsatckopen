

import blogService from '../services/blogs'

import { createNotification } from './notificationReducer'
import { setTypeNotification } from './notificationTypeReducer'

export const initializeBlogs = () => {

  return async dispatch => {
    const blogs= await blogService.getAll()
    dispatch({ type:'INIT_BLOGS',data:blogs })
  }
}
//addBlog(objBlog)
export const addBlog =(objBlog) => {
  return async dispatch => {
    try {
      const blogInDb = await blogService.create(objBlog)
      const blog = await blogService.getBlog(blogInDb.id)
      dispatch({ type:'ADD_BLOG',data:blog })
      dispatch(setTypeNotification('SUCESSFULL'))
      dispatch(createNotification(`a new blog ${objBlog.title} by ${objBlog.author} added`,3000) )
    }
    catch(error){
      console.log('error=',error.response.data.error)
      dispatch(setTypeNotification('ERROR'))
      dispatch(createNotification(error.response.data.error,3000))
    }
  }
}
export const updateBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog={ title:blog.title, author:blog.author,url:blog.url,likes:blog.likes }
      const blogUpdatedInDb =  await blogService.update(blog.id,newBlog)

      const blogUpdated= await blogService.getBlog(blogUpdatedInDb.id)
      dispatch({ type:'UPDATE_BLOG',data:blogUpdated })
      //dispatch(setTypeNotification('SUCESSFULL'))
      //dispatch(createNotification('BLOG ACTUALIZADO',3000))

    }
    catch(error)
    {
      console.log('error en blogReducer=',error.response.data.error)
      dispatch(setTypeNotification('ERROR'))
      dispatch(createNotification(error.response.data.error,3000))
    }
  }
}
export const removeBlog =( id ) => {
  return async dispatch  => {
    try{
      await blogService.deleteBlog(id)
      dispatch({ type:'REMOVE_BLOG',data:id })
    }
    catch(error)
    {
      console.log('error en removeBlog=',error.response.data.error)
      dispatch(setTypeNotification('ERROR'))
      dispatch(createNotification(error.response.data.error,3000))
    }
  }
}

export const addComment = (blog,comment) => {
  return async dispatch => {
    try {
      //const addComment = async (id,comment)
      const blogUpdatedInDb = await blogService.addComment(blog.id,comment)
      const blogUpdated= await blogService.getBlog(blogUpdatedInDb.id)
      dispatch({ type:'UPDATE_BLOG',data:blogUpdated })
    }
    catch(error)
    {
      console.log('error addComment=',error.response.data.error)
      dispatch(setTypeNotification('ERROR'))
      dispatch(createNotification(error.response.data.error,3000))
    }
  }
}
const blogReducer= (state=[],action) => {
  switch (action.type){
  case 'INIT_BLOGS': return action.data
  case 'ADD_BLOG': return [...state,action.data]
  case 'UPDATE_BLOG':{
    //console.log('UPDATE_BLOG')
    return state.map( blog => blog.id===action.data.id? action.data:blog )}
  case 'REMOVE_BLOG': return state.filter(blog => blog.id!==action.data)
  default: return state
  }
}
export default blogReducer