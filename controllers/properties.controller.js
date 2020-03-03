const createError = require('http-errors')
const mongoose = require('mongoose')

const Property = require('../models/properties/property.model')
const Flat = require('../models/properties/flat.model')
const Room = require('../models/properties/room.model')
const Garage = require('../models/properties/garage.model')
const CommercialSpace = require('../models/properties/commercialSpace.model')

const propertiesCorrelation = {
  flat: Flat,
  garage: Garage,
  room: Room,
  commercialSpace: CommercialSpace
}

module.exports.list = (req, res, next) => {
  const { type } = req.query
  console.log(type)

  const criteria = {}

  if (type) {
    criteria.propertyType = propertiesCorrelation[type].modelName
  }

  console.log(criteria)

  Property.find(criteria)
    .then(
      properties => res.json(properties)
    ).catch(
      error => next(error)
    )
}

module.exports.create = (req, res, next) => {
  const propertyType = propertiesCorrelation[req.params.type]
  const newProperty = new propertyType(req.body)

  newProperty.save()
    .then(property => {
      res.json(property)
    })
    .catch(error => next(error))
}

module.exports.detail = (req, res, next) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(404))
  } else {
    Property.findById(id)
      .then(
        property => {
          res.json( property )
        }).catch(
          error => next (error)
        )
  }
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id

  if(!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(404))
  } else {
    Property.findByIdAndUpdate(id, req.body, { new: true})
      .then(
        property => {
          res.json( property )
        }).catch(
          error => next (error)
      )
  }
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id

  if(!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(404))
  } else{
    Property.findByIdAndDelete(id)
      .then(propertyDeleted => {
        console.log ('Property deleted', propertyDeleted)
        res.status(204).json({})
      })
      .catch(error => next(error))
  }
}