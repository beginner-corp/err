var BaseError = require('./error')

module.exports.BaseError = BaseError

var errors = [
  {name: 'InternalError', code: 500},
  {name: 'DatabaseError', code: 500},
  {name: 'NotFoundError', code: 404},
  {name: 'NotAuthorizedError', code: 403},
]

errors.forEach(err=> {
  var {name, code} = err
  eval(`
    class ${name} extends BaseError {
      constructor(msg) {
        super(msg)
        this.code = ${code}
      }
    }
    
    module.exports['${name}'] = ${name}
  `)
})
