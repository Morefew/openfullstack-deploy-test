import mongoose from 'mongoose'

// Schema definition with Mongoose
const phonebookSchema = new mongoose.Schema({
  name: {type: String, minLength: [3, 'Name minimum length is 3 characters'], required: [true, 'Name is a required field'], },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{3}-\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! Please use the format XX-XXX-XXXX or XXX-XXX-XXXX`
    },
    required: [true, 'User phone number is required']
  }
  // phone: String,
})

export default mongoose.model('Entries', phonebookSchema)
