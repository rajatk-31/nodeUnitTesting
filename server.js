const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
mongoose.Promise = global.Promise;
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

mongoose.connect('mongodb://localhost/unitTest', { useNewUrlParser: true }, (err, done) => {
    if (!err) {
        console.log("Connected to database.")
    } else {}
})

app.use('/', routes)

app.listen(3001, () => {
    console.log("Access api's on http://localhost:3001")
})

module.exports = app;