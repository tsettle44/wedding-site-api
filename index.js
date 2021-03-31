const express = require('express')
require('dotenv').config()
const cors = require("cors");
const app = express()

//Middleware
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// parse application/json



const mongoose = require("mongoose");
const port = process.env.PORT || 3000
//rsvp Model
const Rsvp = require('./model/model')

mongoose.connect( process.env.MONGO, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection

//connection error
db.on('error', console.error.bind(console, 'connection error'))

app.get('/', (req, res) => {
    res.send("Connected")
})

app.post('/rsvp', (req, res) => {
    //new rsvp
    Rsvp.findOneAndUpdate({_id: req.body._id}, { attending: req.body.attending, meal: req.body.meal, veggieChecked: req.body.veggieChecked, chickenChecked: req.body.chickenChecked}, { useFindAndModify: false }, err => {
        if (err) throw err
        res.sendStatus(200)
    })
})

app.get('/rsvp/:firstName/:lastName', (req, res) => {
  Rsvp.find({firstName: req.params.firstName.trim(), lastName: req.params.lastName.trim()}, (err, guest) => {
    if (guest.length === 0) {
        res.send(guest)
        return
    }
      Rsvp.find({party: guest[0].party}, (err,party) => {
          res.send(party)
      })
  })
})

app.listen(port, () => {
  console.log(`App listening at ${port}`)
})