import mongoose from 'mongoose'

// Schema definition with Mongoose
const phonebookSchema = new mongoose.Schema({
  name: {type: String, minLength: 3, required: true},
  phone: String,
})

export default mongoose.model('Entries', phonebookSchema)
