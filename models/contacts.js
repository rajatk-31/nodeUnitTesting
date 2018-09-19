const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userContacts = new Schema({
    createdBy: String,
    name: String,
    phone: Number
})

module.exports = mongoose.model('userContacts', userContacts)