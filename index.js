const express = require('express')
const cors = require("cors");
const app = express()

//Middleware
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// parse application/json



const mongoose = require("mongoose");
const port = 3000
//rsvp Model
const Rsvp = require('./model/model')
//mongo credentials
const Cred = require('./cred')

mongoose.connect( Cred, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection

//connection error
db.on('error', console.error.bind(console, 'connection error'))

app.post('/rsvp', (req, res) => {
    //new rsvp
    Rsvp.findOneAndUpdate({_id: req.body._id}, { attending: req.body.attending, meal: req.body.meal }, { useFindAndModify: false }, err => {
        if (err) throw err
        res.sendStatus(200)
    })
})

app.get('/rsvp/:firstName/:lastName', (req, res) => {
  Rsvp.find({firstName: req.params.firstName, lastName: req.params.lastName}, (err, guest) => {
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
  console.log(`Example app listening at http://localhost:${port}`)
})