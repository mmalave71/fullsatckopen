//Phonebook Backend
const express = require('express')
const morgan= require('morgan')
const cors = require('cors')
const app=express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

require('dotenv').config()

//Defino el token body
morgan.token('body',  (request) => {
  if (request.method==='POST'){
    return JSON.stringify(request.body)
  }
  else {
    return ''
  }

})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
const Person=require('./models/person')

app.get('/api/persons',(request,response) => {
  Person.find({})
    .then(persons => response.json(persons)  )
    .catch(e => {
      console.log('Ha ocurrido el siguiente error:',e)
      response.status(404)
      response.end()
    })

})

app.get('/info',(request,response) => {

  Person.find({})
    .then ( persons => {
      let vdate=new Date()
      vdate=vdate.toDateString()+ '  '+vdate.toTimeString()
      let vmessage=`<h3>PhoneBook has info for ${persons.length} people</h3>`
      vmessage=vmessage+'<h3>'+vdate+'</h3>'
      response.send(vmessage)
    })

})

app.get('/api/persons/:id',(request,response,next) => {
  const id=request.params.id
  //console.log(typeof id,id);
  Person.findById(id)
    .then( person => {
      if (person){
        response.json(person)
      }else {
        response.status(404)
        response.end()
      }
    })
    .catch( e => next(e))
})
app.delete('/api/persons/:id',(request,response,next) => {
  const id=request.params.id
  Person.findByIdAndRemove(id)
    .then( result => {
      console.log('result',result)
      if (result){
        response.status(204)
        response.end()
      }else {
        response.status(404)
        response.end()
      }
    })
    .catch( e => next(e) )

})

app.post('/api/persons',(request,response,next) => {
  const body =request.body

  const objPerson = {
    name: body.name,
    number: body.number
  }
  const person = new Person(objPerson)
  person.save()
    .then(personSaved => response.json(personSaved))
    .catch(e => { next(e) })

})

app.put('/api/persons/:id', (request, response,next) => {
  const id=request.params.id
  const body = request.body

  const personToUpdate = { number: body.number }
  Person.findByIdAndUpdate(id, personToUpdate, { new: true, runValidators: true })
    .then(personUpdate => {

      if (personUpdate) {
        console.log('personUpdate', personUpdate)
        response.json(personUpdate)
      } else {
        console.log('person no found')
        response.status(404)
        response.json({ error: 'person no found' })
      }

    })
    .catch(e => next(e))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler= (error,request,response,next) => {

  //console.log("error.name=",error.name);
  //console.log("error.message=",error.message);

  if (error.name === 'CastError') {
    console.error('Malformatted id')
    response.status(400)
    return response.json({ error: 'Malformatted id' })
  }
  if (error.name === 'ValidationError') {
    console.error('error:', error.message)
    response.status(400)
    return response.json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT,() => {console.log(`Aplication listen on port ${PORT}`)})