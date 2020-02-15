const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Property = require('./property.model')
const modality = require('../../constants/modality')

const flatSchema = Property.discriminator('Flat', new Schema(
  {
    modality: { type: String, required: true, enum: modality },
    bathrooms: { type: Number, required: true },
    rooms: { type: Number, required: true },
    pets: { type: Boolean, required: false },
    smoking: { type: Boolean, required: false },
    furnished: { type: Boolean, required: false },
    garage: { type: Boolean, required: false },
    terrace: { type: Boolean, required: false },
    doorman: { type: Boolean, required: false },
    heatingCost: { type: Number, required: false },
    electricityCost: { type: Number, required: false },
    communityCost: { type: Number, required: false },
    waterCost: { type: Number, required: false },
  }
))

const Flat = mongoose.model('Flat');
module.exports = Flat 