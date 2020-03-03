const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Property = require('./property.model')
const gender = require('../../constants/gender')

const roomSchema = Property.discriminator('Room', new Schema(
  {
    modality: { type: String, required: true, default: 'rent' },
    bathrooms: { type: Number, required: true },
    rooms: { type: Number, required: true },
    pets: { type: Boolean, required: false },
    smoking: { type: Boolean, required: false },
    furnished: { type: Boolean, required: false },
    garage: { type: Boolean, required: false },
    terrace: { type: Boolean, required: false },
    doorman: { type: Boolean, required: false },
    minimumStay: { type: Number, required: false },
    billsIncluded: { type: Boolean, required: false },
    gender: { type: String, required: false, enum: gender}
  }
))

const Room = mongoose.model('Room')
module.exports = Room 