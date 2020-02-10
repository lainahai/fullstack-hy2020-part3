
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

const app = express()


morgan.token('post-body', (req) => { 
  if(req.method === 'POST'){
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json()) 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :post-body'))



app.get('/info', (request, response) => {
  Contact.find({}).then(persons => {
    response.send(`Phonebook has info for ${persons.length} people
    <br><br>
    ${new Date()}`)
  })
  
})

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  console.log('Finding by id:', request.params.id)
  Contact.findById(request.params.id)
    .then(person => {
      console.log(person)
      if(person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id' ,(request, response, next) => {
  const id = request.params.id
  Contact.findByIdAndRemove(id)
    .then( () => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const contact = new Contact({ 
    name: body.name, 
    number: body.number 
  })
  contact.save()
    .then( ()  => {
      console.log(`Added ${contact.name} ${contact.number} to contacts`)
      response.status(200).json(contact)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body
  const contact = {
    name: body.name,
    number: body.number,
  }
  console.log(`Updating ${contact.name}`)
  Contact.findByIdAndUpdate(id, contact, { new: true })
    .then(updatedContact => {
      response.json(updatedContact.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'invalid id format' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`puhelinluettelo-backend running in port ${PORT}`)
})
