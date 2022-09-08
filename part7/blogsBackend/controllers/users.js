const express=require('express')
const userRouter=express.Router()
const User=require('../models/user')
const bcrypt=require('bcryptjs')

userRouter.get('/', async (request, response) => { 
        const users= await User.find({}).populate('blogs',{title:1})
        response.json(users)
})
userRouter.post('/', async (request, response) => {
    const body=request.body
   
    if (!body.password) {
        return response.status(400).json({error:'missing password'})
    }
    if (body.password.length<3) {
        return response.status(400).json({error:'password is shorter than the minimum allowed length (3)'})
    }
    
    const passwordHash = await bcrypt.hash(body.password,10)    
    const objuser={ username:body.username, name:body.name,passwordHash  }

    const user= new User(objuser)
    const result=await user.save()
    if (result) {
        response.json(result)
    } 
}) 

userRouter.delete('/:id', async (request,response) => {
    const result=await User.findByIdAndRemove(request.params.id)
    if (result){
        response.status(204).end()
    }else {
        response.status(404).end()
    }
})

module.exports=userRouter