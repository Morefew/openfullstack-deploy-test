const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
// app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))


// morgan.token('body', function (req, res) {
//   return (JSON.stringify(req.body))
// })

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    'Res-Stat:',
    tokens.status(req, res),
    'Content-Length :',
    tokens.res(req, res, 'content-length'),
    'Response-Time:',
    tokens['response-time'](req, res), 'ms',
    'Date:',
    tokens.date(req, res),
  ].join(' - ')
}))


let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "phone": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "phone": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "phone": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "phone": "39-23-6423122"
  },
  {
    "id": "5",
    "name": "Mario Fountain",
    "phone": "35-90-3869236"
  }
]

app.get('/info', (req, res) => {
  const date = new Date().toString();
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>Date: ${date}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const note = persons.find(note => note.id === id);
  if (note) {
    res.json(note)
  } else {
    res.status(404).json({message: "Note not found"})
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => p.id === id);
  if (person) {
    persons = persons.filter(person => person.id !== id);
    res.status(200).json({message: "Person deleted", person})
  } else {
    res.status(404).json({message: "Person not found"})
  }
})

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => Number(n.id))) : 0;
  return String(maxId + 1);
}

app.post('/api/persons', (req, res) => {
  const body = req.body;
  console.log(body)
  console.log(typeof (body))

  if (!body.name) {
    return res.status(400).json({error: "Name is required"})
  }
  if (!body.phone) {
    return res.status(400).json({error: "Number is required"})
  }

  if (persons.find(person => person.name === body.name)) {
    return res.status(400).json({error: "Name already exists"})
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    phone: body.phone
  }

  persons = persons.concat(newPerson);

  res.status(201).json(newPerson);

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})