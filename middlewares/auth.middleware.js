const createError = require('http-errors')

module.exports.isAuthenticated = (req, res, next) => {
  if( req.session.user ) {
    next()
  } else {
    createError(401)
  }
}

module.exports.isNotAuthenticated = ( req, res, next ) => {
  if ( req.session.user ) {
    next(createError(403))
  } else {
    next()
  }
}