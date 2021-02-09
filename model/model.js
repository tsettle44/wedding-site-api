const mongoose = require('mongoose')
const rsvpSchema = require('../schema/individual')

const Rsvp = mongoose.model('Rsvp', rsvpSchema)

module.exports = Rsvp