const res = require('express/lib/response')
const logger=require('./logger')
const requestLogger=(request,response,next)=>{
    logger.info('Method:',request.method)
    logger.info('Path:',request.path)
    logger.info('Body:',request.body)
    next()
}

const unknowEndpoint=(request,response)=>{
        response.status(404).json({error:'unknown endpoint'})
}   

const tokenExtractor = (request,response,next) => {
    const authorization=request.get('authorization')
    let token = null
    if (authorization){
        if (authorization.toLowerCase().startsWith('bearer ')) {
            token = authorization.substring(7)
        }
    }
    request.token = token
    next()
}
const errorHandler=(error,request,response,next)=>{
        logger.error('error.name=',error.name)
        logger.error('error.message',error.message)
        if (error.name==='SyntaxError'){
            return  response.status(400).json({error:error.message})
        }
        if (error.name==='ValidationError'){
            return  response.status(400).json({error:error.message})
        }
        if (error.name==='CastError'){
            return response.status(400).json({error:'mal formatted id'})
        }
        if (error.name==='JsonWebTokenError'){
            return response.status(401).json({ error: error.message})
        }

        next(error)
}

module.exports={requestLogger,unknowEndpoint,errorHandler,tokenExtractor}