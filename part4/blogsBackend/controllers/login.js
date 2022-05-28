const express = require('express')
const loginRouter=express.Router()
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request,response)=> { 

    const body =request.body
    if (!body.username) { return response.status(400).json({error:' missing username'}) }
    if (!body.password) { return response.status(400).json({error:'missing password'})}

    const user = await User.findOne({ username: body.username})

    if (!user) {  return response.status(401).json({ error:'invalid username'}) }
    
    const passwordCorrect =await  bcrypt.compare(body.password,user.passwordHash)
    if  (!passwordCorrect) { return response.status(401).json({error:'invalid password'}) }

    const userForToken ={ id:user._id, username: user.username   }
    const token= jwt.sign(userForToken,process.env.SECRET)
    response.json( { token, username: user.username, name: user.name})
})

module.exports=loginRouter