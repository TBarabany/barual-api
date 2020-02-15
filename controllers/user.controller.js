const createError = require('http-errors')
const mongoose = require('mongoose')

const User = require('../models/user.model')


module.exports.list = (request, response, next) => {
	User.find()
		.then(
			users => response.json(users)
		).catch(
			error => next(error)
		)
}

module.exports.create = (request, response, next) => {
  console.info('body request => ', request.body)
  const user = new User(request.body)

  user.save()
      .then((user) => response.json(user))
      .catch(error => next(error))
}

module.exports.detail = (req, res, next) => {
	const id = req.params.id

	if (!mongoose.Types.ObjectId.isValid(id)) {
			next(createError(404))
	} else {
			User.findById(id)
					.then(
							user => {
									res.json(user)
							}
					).catch(
							error => next(error)
					);
	}
}

module.exports.edit = (req, res, next) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
			next(createError(404));
	} else {
			User.findByIdAndUpdate(id, req.body, { new: true })
					.then(
							user => {
									res.json( user )
							}
					).catch(
							error => next(error)
					);
	}
}

module.exports.delete = (req, res, next) => {
	const id = req.params.id;

	if(!mongoose.Types.ObjectId.isValid(id)) {
			next(createError(404));
	} else {
			User.findByIdAndDelete(id)
					.then(userDeleted => {
							console.log('User deleted => ', userDeleted)
							res.status(204).json({})
					})
					.catch(error => next(error))
	}
}

