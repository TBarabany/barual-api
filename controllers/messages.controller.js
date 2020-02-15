const createError = require('http-errors')
const mongoose = require('mongoose')

const Message = require('../models/messages.model')
const mailer = require('../config/mailer.config')

module.exports.list = (req, res, next) => {
  Message.find()
    .populate('property')
    .then(
      message => res.json(message)
    ).catch(
      error => next(error)
    )
}

module.exports.detail = (req, res, next) => {
  const id = req.params.id
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(404))
  } else {
    Message.findById(id)
      .populate('property')
      .then(
        message => res
      ).catch(
        error => next(error)
      )
  }    
}

module.exports.create = (req, res, next) => {
  const message = new Message({
    property: req.params.id,
    ...req.body
  })

  message.save()
    .then((message) => {
      mailer.sendValidateEmail(
        message.property, 
        message.name, 
        message.email, 
        message.phone, 
        message.message)
      res.json(message)
    }).catch(
      error=> next(error)
    )
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id

  Message.findByIdAndDelete(id)
    .then( messageDeleted => {
      console.log ('Message Succesfully Deleted', messageDeleted)
      res.status(204).json({})
    }).catch(
      error => next(error)
    )
}
