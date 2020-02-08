
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


morgan.token('post-body', (req, res) => { 
  if(req.method === "POST"){
    return JSON.stringify(req.body)
  }
  return ""
})

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :post-body'))
app.use(express.json()) 
app.use(express.static('build'))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

const generateId = () => 1 + Math.floor(Math.random()*100000)


app.get("/info", (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people
  <br><br>
  ${new Date()}`)
})

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id" ,(request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  
  if(!body.name || !body.number) {
    response.status(400).json({
      error: "Name and number cannot be empty"
    })
    return
  }

  if(persons.find(person => person.name === body.name)){
    response.status(400).json({
      error: "Name must be unique"
    })
    return
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
    timestamp: new Date()
  }
  persons = persons.concat(person)
  response.status(200).json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`puhelinluettelo-backend running in port ${PORT}`)
})