const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loginSchema = new Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model('userLogin', loginSchema)