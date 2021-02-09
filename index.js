const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()
const mongoose = require("mongoose");
const mongodb = require('mongodb').MongoClient
const port = 3000

const Cred = require('./cred')

mongoose.connect( Cred, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection

//connection error
db.on('error', console.error.bind(console, 'connection error'))

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.post('/rsvp', (req, res) => {

})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})