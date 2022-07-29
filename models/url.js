const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
  }
})

module.exports = mongoose.model('Url', urlSchema)