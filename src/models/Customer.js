const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
})

// creando modelo a partir del esquema
const CustomerModel = mongoose.model('Customer', customerSchema)

// exportando
module.exports = CustomerModel