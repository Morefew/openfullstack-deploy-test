import express from 'express'
import mongoose from 'mongoose';
import Entries from './models/entrie.js'
import cors from 'cors'
import 'dotenv/config';
// Logger
import morgan from 'morgan'

const allowedOrigins = [
  'https://openfullstack-deploy-test.vercel.app/', //  production frontend URL
  'http://localhost:5173' // local development URL
];


const app = express()

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});


// Logger configuration
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

// JSON Request body parser
app.use(express.json())
// Static Files Configuration
app.use(express.static('dist'))

app.get('/api/persons/', (req, res) => {
  Entries.find({}).then(entry => {
    res.json(entry)
  })
})

app.get('/info', async (req, res) => {
  const date = new Date().toLocaleDateString("de");
  try {
    const entriesTotal = await Entries.countDocuments({})
    if (!entriesTotal) {
      res.status(404).json('No entries saved yet')
    }
    res.status(200).json(`Phonebook has a total of ${entriesTotal} entries up until ${date}`)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

app.get('/api/persons/:id', (req, res, next) => {
  Entries.findById(req.params.id).then(entry => {
    if (entry) {
      res.json(entry)
    } else {
      res.status(404).json('Contact Not Found')
    }
  })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Entries.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {

  const {name, phone} = req.body;
  console.log('Body en update route: ',req.body);

  const newEntry = {
    name,
    phone
  }
  Entries.findByIdAndUpdate(req.params.id, newEntry, {new: true})
    .then(updatedEntry => {
      res.json(updatedEntry)
    })
    .catch(err => next(err))
})

app.post('/api/persons/', (req, res, next) => {
  const {name, phone} = req.body;
  console.log('Body en post route: ',req.body);

  if (!name) {
    return res.status(400).json({error: "Name is required"})
  }
  if (!phone) {
    return res.status(400).json({error: "Number is required"})
  }

  Entries.findOne({'name': name})
    .then(existingEntry => {
      if (existingEntry) {
        return res.status(400).json({error: "Name already exists"});
      } else {
        const newEntry = new Entries({name, phone});
        return newEntry.save()
          .then(savedEntry => {
            res.status(201).json(savedEntry);
          });
      }
    })
    .catch(error => next(error))
});

//
const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err.name === 'CastError') {
    return res.status(400).json({error: 'Malformed id'})
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({error: err.message})
  }
  next(err);
}


app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})