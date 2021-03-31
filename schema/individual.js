const mongoose = require('mongoose')
const { Schema } = mongoose;

const rsvpSchema = new Schema({
  firstName:  String, // String is shorthand for {type: String}
  lastName: String,
  attending:   Boolean,
  meal: String,
  date: { type: Date, default: Date.now },
  party: String,
  veggieChecked: {type: Boolean, default: false},
  chickenChecked: {type: Boolean, default: false}
});

module.exports = rsvpSchema