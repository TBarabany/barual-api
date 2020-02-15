const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const Message = require ('../messages.model')

const propertiesSchema = new Schema (
  {  
    images: { type: [String], required: false },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    squareMeters: { type: Number, required: true },
    description: { type: String, required: false },
    security: { type: Boolean, required: false },
    elevator: { type: Boolean, required: false },
    yearConstruction: { type: Number, required: false },
    floor: { type: Number, required: false },
    newConstruction: { type: Boolean, required: false }, 
    views: { type: Number, required: false },
    infoRequests: { type: Number, required: false },
    messages: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required: false
    }
  }, 
  {
    timestamps: true, 
    discriminatorKey: 'propertyType',
    collection: 'properties', 
    toJSON: {
      virtuals: true, 
      transform: (doc, ret) => {
        ret.id = doc._id
        delete ret._id
        delete ret._v
        return ret
      }
    }
  }
)

const Properties = mongoose.model('Properties', propertiesSchema)

module.exports = Properties