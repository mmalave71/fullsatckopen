const express = require('express')
const blogRouter = express.Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {  
    const blogs= await Blog.find({}).populate('user',{ username:1, name:1})
    response.json(blogs)
  })
  
  blogRouter.get('/:id', async (request, response) => {  
    const id=request.params.id
    const blogs= await Blog.findById(id).populate('user',{ username:1, name:1})
    response.json(blogs)
  })

blogRouter.post('/', async (request, response) => {
  const body=request.body
  const token=request.token

  if (!token){  return response.status(401).json({ error:'token missing'}) }

  const decodeToken= jwt.verify(token,process.env.SECRET)
  if (!decodeToken.id) {   return response.status(401).json({ error:' token invalid'})   } 

  if (!body.url) { return response.status(400).json({error:'missing url'}) }
  if (!body.likes) { body.likes=0 }
  
  const user=await User.findById(decodeToken.id)
  const newBlog={ title: body.title,author: body.author,url:body.url,likes:body.likes,user:decodeToken.id}
  const blog = new Blog(newBlog)  
  const result= await blog.save()
 
   if (result) {
        user.blogs=user.blogs.concat(result._id)
        const userUpdated= await User.findByIdAndUpdate(user._id,user,{new:true})
        response.status(201)
        response.json(result)
    }
   
})
blogRouter.delete('/:id', async (request,response)=>{
    const token=request.token
    const decodeToken=jwt.verify(token,process.env.SECRET)
    const id=request.params.id
    
    if (!decodeToken.id) {   return response.status(401).json({ error:' token invalid'})   } 

     const blog= await Blog.findById(id) 
     if (blog) {
        if (blog.user.toString()!==decodeToken.id.toString()) {
           return response.status(401).json({ error:' user no authorized'})
        }
     }
  
    result=await Blog.findByIdAndRemove(id)
    
    if (result){
        
        if (blog) {
            const user= await User.findById(blog.user)
            if (user) {  
              user.blogs=user.blogs.filter(bid=>bid.toString()!==id)  
              await User.findByIdAndUpdate(user._id,{blogs:user.blogs })
            }
        }  
        response.status(204)
        response.end()
    }else{
      response.status(404)
      response.end()
    }    

})

blogRouter.put('/:id',async(request,response)=>{
      const token=request.token
      if (!token){ return response.status(401).json({error:'token missing'})}

      const body=request.body
      const objBlog={title: body.title, author:body.author,url:body.url,likes:body.likes,comments:body.comments};
      const tokenDecoded= jwt.verify(token,process.env.SECRET)

      if (!tokenDecoded.id) { return response.status(401).json({error:'token invalid '}) }
      
      const blog= await Blog.findById(request.params.id)
      if (blog){
          if (blog.user.toString()!==tokenDecoded.id.toString() )  {
              return response.status(401).json({error:'user not authorized'})
          }
      }else{
          return response.status(404).json({error:'Blog no found'})
      }
      
      const result= await Blog.findByIdAndUpdate(request.params.id,objBlog,{new:true,runValidators:true})
      if (result){
            response.status(200)
            response.json(result)
      }

})

blogRouter.post('/:id/comments',async (request,response) => {
    
   const idBlog=request.params.id
   const body=request.body
   const comment=body.comment
   
   const blog= await Blog.findById(idBlog)

    if (blog){
        const objBlog={title: blog.title, author:blog.author,url:blog.url,likes:blog.likes,comments:blog.comments.concat(comment)};

        const result= await Blog.findByIdAndUpdate(idBlog,objBlog,{new:true,runValidators:true})
        if (result){
          response.status(200)
          response.json(result)
        }
    }

})
blogRouter.get('/:id/comments',async (request,response)=>{
  const idBlog=request.params.id
  const blog= await Blog.findById(idBlog)
  if (blog){
    response.status(200)
    response.json(blog.comments)
  }

})

  module.exports = blogRouter