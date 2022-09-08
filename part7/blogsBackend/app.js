
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const logger=require('./utils/logger')
const config=require('./utils/config')
const middleware=require('./utils/middleware')
const blogRouter=require('./controllers/blogs')
const userRouter=require('./controllers/users')
const loginRouter=require ('./controllers/login')

const mongoUrl =config.MONGODB_URI_LOCAL
logger.info(`Connecting to ${mongoUrl}`)
mongoose.connect(mongoUrl)
.then( ()=>{ logger.info(`Connected to MongoDB`)})
.catch(e=>{logger.error('Error connecting to MongoDB:',e.message)})



app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login',loginRouter)
app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter)
if (process.env.NODE_ENV==='test'){
    const testingRouter=require('./controllers/testing')
    app.use('/api/testing',testingRouter)
}

app.use(middleware.unknowEndpoint)
app.use(middleware.errorHandler)

module.exports=app