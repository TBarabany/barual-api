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

module.exports.doLogin = (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		throw createError(400, 'missing credentials')
	}

	User.findOne({ email: email })
		.then(user => {
			if (!user) {
				throw createError (404, 'user not found')
			 } else {
				 return  user.checkPassword(password)
				 .then(match => {
					 if (!match) {
						 throw createError(400, 'invalid password')
					 } else {
						 req.session.user = user 
						 res.json(user)
					 }
				 })
			 }
		})
		.catch(next)
}

module.exports.logout = (req, res) => {
	console.log('entr')
	req.session.destroy()
	res.status(204).json()
}