var test = require('tape')
var err = require('.')
var old = require('./oldschool')

test('env', t=> {
  t.plan(1)
  t.ok(err, 'exists')
  console.log(err)
})

/**
 * types aren't useful if we can't interrogate them at runtime
 * we want to subclass and still have instanceof checks pass
 */
test('instanceof works', t=> {
  t.plan(4)
  var boom = new err.InternalError('halp')
  t.ok(boom instanceof Error, 'is an Error')
  t.ok(boom instanceof err.Err, 'is a Err')
  t.ok(boom instanceof err.InternalError, 'is an InternalError')
  t.ok(boom.code === 500, 'boom.code is 500')
  console.log(boom)
})

/**
 * very common use case is casting errors back to the client in JSON
 */
test('toObject', t=> {
  t.plan(1)
  var boom = new err.InternalError('halp')
  var b = boom.toObject()
  t.ok(b.name === 'InternalError', 'name property serialized')
  console.log(b)
})

/**
 * also somewhat common is a toSting check *Error:
 */
test('toString', t=> {
  t.plan(1)
  var boom = new err.InternalError('halp')
  var b = boom.toString()
  t.ok(b.includes('Error:'), b)
  console.log(b)
})

/**
 * <Error>.code property could be passthru to an http statusCode
 *
 * - 500
 * - 404
 * - 403
 */
test('http friendly helpers', t=> {
  t.plan(5)

  var wtf = new err.Err('base err')
  var fail = new err.InternalError('internal "server" err')
  var db = new err.DatabaseError('db err')
  var notFound = new err.NotFoundError('did not find')
  var notAllowed = new err.NotAuthorizedError('no auth')

  t.ok(typeof wtf.code === 'undefined', 'base error has no code')
  console.log(wtf)

  t.ok(fail.code === 500, 'fail is 500')
  console.log(fail)

  t.ok(db.code === 500, 'db fail is also 500')
  console.log(db)

  t.ok(notFound.code === 404, 'not found is 404')
  console.log(notFound)

  t.ok(notAllowed.code === 403, 'not allowed is 403')
  console.log(notAllowed)
})

/**
 * if you are accustomed to  callback(Error('wtf')) style
 * this syntax might appeal to you
 */
test('oldschool factory methods', t=> {
  t.plan(5)
  var err = old
  t.ok(err.Err('wtf') instanceof Error, 'Err is an Error')
  t.ok(err.Internal('wtf') instanceof Error, 'Internal is an Error')
  t.ok(err.Database('wtf') instanceof Error, 'Database is an Error')
  t.ok(err.NotFound('wtf') instanceof Error, 'NotFound is an Error')
  t.ok(err.NotAuthorized('wtf') instanceof Error, 'NotAuthorized is an Error')
})
