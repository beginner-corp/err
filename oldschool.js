var err = require('.')

module.exports = {
  Err(msg) {
    return new err.Err(msg)
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
