const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()
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

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.post('/rsvp', (req, res) => {
    //new rsvp
    const newRsvp = new Rsvp({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        attending: req.body.attending,
        meal: req.body.meal,
        party: req.body.party
    })
    newRsvp.save(err => {
        if (err) throw err
        res.send(`Thank you ${req.body.firstName} for your RSVP!`)
    })
})

app.get('/rsvp', (req, res) => {

  Rsvp.find({firstName: req.body.firstName, lastName: req.body.lastName}, (err, guest) => {
    if (guest.length === 0) {
        res.send("Name not found")
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