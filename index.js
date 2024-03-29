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

app.get('/rsvp', async (req, res) => {
  guests = await Rsvp.find({});

  res.send(guests)

})

app.get('/rsvp/attending', async (req, res) => {
  guests = await Rsvp.find({attending: true}).sort({ date: -1 });

  res.send(guests)

})

app.get('/rsvp/decline', async (req, res) => {
  guests = await Rsvp.find({declineChecked: true}).sort({ date: -1 });

  res.send(guests)

})

app.get('/rsvp/no-response', async (req, res) => {
  guests = await Rsvp.find({}).exec();
  guestNo = [];
  
  for (guest in guests) {
    if(guests[guest].date === null) {
      guestNo.push(guests[guest]);
    }
  }
  
  res.send(guestNo)

})

app.post('/rsvp', (req, res) => {
    //new rsvp
    Rsvp.findOneAndUpdate({firstName: req.body.firstName, lastName: req.body.lastName, party: req.body.party}, { attending: req.body.attending, date: req.body.date, meal: req.body.meal, veggieChecked: req.body.veggieChecked, chickenChecked: req.body.chickenChecked, attendingChecked: req.body.attendingChecked, declineChecked: req.body.declineChecked}, { useFindAndModify: false }, err => {
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
