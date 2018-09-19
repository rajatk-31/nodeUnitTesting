const express = require('express')
const app = express.Router()
const verify = require('./tokenVerify')

/**
 * Register and Login
 */
const registerLogin = require('./registerAndLogin')
app.post('/register', registerLogin.register)
app.post('/login', registerLogin.login)

/**
 * Contact operations
 */
const contact = require('./contactFunctions')
app.post('/addContact', verify, contact.new)
app.get('/getContacts', verify, contact.get)

module.exports = app