const mongoose = require('mongoose')
const { Schema } = mongoose;

const rsvpSchema = new Schema({
  firstName:  String, // String is shorthand for {type: String}
  lastName: String,
  attending:   Boolean,
  meal: String,
  date: { type: Date, default: Date.now },
  party: String
});

module.exports = rsvpSchema