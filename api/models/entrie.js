import mongoose from 'mongoose'

// Schema definition with Mongoose
const phonebookSchema = new mongoose.Schema({
  name: {type: String, minLength: 3, required: true},
  phone: String,
})

// default export mongoose.model('Entries', phonebookSchema)
export default mongoose.model('Entries', phonebookSchema)
