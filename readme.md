# `@smallwins/err`

Slightly better custom `Error`s

- Same runtime interface: just pass a message to the constructor
- Respects `extends` with clean `name` and `stack` properties
- Adds `toObject` returns a plain object representation
- Bundles common HTTP error types with a `code` property

```bash
npm i @smallwins/err --save
```

### Bundled Error Types

- `err.Err` a base `Error` type intended for extending
- `err.InternalError` has a `code` property of `500`
- `err.DatabaseError` has a `code` property of `500`
- `err.NotFoundError` has a `code` property of `404`
- `err.NotAuthorizedError` has a `code` property of `403`

## Usage

Example usage:

```javascript
var err = require('@smallwins/err')

let notFound = new err.NotFoundError('missing record')
console.log(err.code) // logs 404
```

Subclass to add additional properties such as `code`:

```javascript
var err = require('@smallwins/err')

class CoffeeError extends err.Err {
  constructor(params) {
    super(params)
    this.code = 500
  }
}

let e = new CoffeeError('lactose intolerant')
console.log(e.code) // logs 500
```

Get a clean representation:

```javascript
console.log(e.toObject())
// logs {name, code, message, stack}
```

Extend by `require`ing error directly:

```javascript
var Err = require('@smallwins/err/err')

class TerribleError extends Err {
  constructor(msg) {
    super(msg)
    this.extra = 'extra info'
  }
}

var e = new TerribleError('wut')
console.log(e.extra)
```

Work oldschool without `new`:

```javascript
var err = require('@smallwins/err/oldschool')

console.log(err.Err('basic') instanceof Error)
// logs true

console.log(err.NotFound('not found err').toString())
// logs NotFound: not found err
```

### `@smallwins/err/oldschool` API

Factory functions which return real `Error` instances:

- `err.Err` returns an `Err` instance
- `err.Internal` returns an `InternalError` instance
- `err.Database` returns a `DatabaseError` instance
- `err.NotFound` returns a `NotFoundError` instance
- `err.NotAuthorized` returns a `NotAuthorizedError` instance

---

Runtime type checking fully supported. Check the tests.
