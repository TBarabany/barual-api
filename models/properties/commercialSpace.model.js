const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Property = require('./property.model')
const modality = require('../../constants/modality')

const commercialSpaceSchema = Property.discriminator('CommercialSpace', new Schema (
  {
    modality: { type: String, required: true, enum: modality },
    bathrooms: { type: Number, required: false },
    smokeOutlet: { type: Boolean, required: false},
    windowDisplay: { type: Boolean, required: false}
  }
))

const CommercialSpace = mongoose.model('CommercialSpace')
module.exports = CommercialSpace
