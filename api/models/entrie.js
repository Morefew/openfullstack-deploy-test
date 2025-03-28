import mongoose from 'mongoose'
import 'dotenv/config'
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI;

// Handling the connexion with the database
console.log("connecting mongodb...");

mongoose.connect(url)
  .then(() => {
    console.log("MongoDB Connected Successfully.")
  })
  .catch(err => {
    console.error('An error has occur connecting to MongoDB: ', err.message)
  })
// ----------------

// Schema definition with Mongoose
const phonebookSchema = new mongoose.Schema({
  name: {type: String, minLength: 3, required: true},
  phone: String,
})


// default export mongoose.model('Entries', phonebookSchema)
export default mongoose.model('Entries', phonebookSchema)
