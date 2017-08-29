var err = require('.')

module.exports = {
  Error(msg) {
    return new err.BaseError(msg)
  },
  Internal(msg) {
    return new err.InternalError(msg)
  },
  Database(msg) {
    return new err.DatabaseError(msg)
  },
  NotFound(msg) {
    return new err.NotFoundError(msg)
  },
  NotAuthorized(msg) {
    return new err.NotAuthorizedError(msg)
  }
}
