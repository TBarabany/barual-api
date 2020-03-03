const createError = require('http-errors')

module.exports.isAuthenticated = (req, res, next) => {
  if( req.session.user ) {
    next()
  } else {
    next(createError(401))
  }
}

module.exports.isNotAuthenticated = ( req, res, next ) => {
  if ( !req.session || !req.session.user ) {
    next()
  } else {
    next(createError(403))
  }
}