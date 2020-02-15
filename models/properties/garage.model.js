const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Property = require('./property.model')
const modality = require('../../constants/modality')

const garageSchema = Property.discriminator('Garage', new Schema(
  {
    modality: { type: String, required: true, enum: modality },
    largeCar: { type: Boolean, required: false, default: false, },
    automaticDoor: { type: Boolean, required: false },
  }
))

const Garage = mongoose.model('Garage');
module.exports = Garage 