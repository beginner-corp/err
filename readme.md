# @smallwins/err

Slightly better custom `Error`s

- Same runtime interface: just pass a message to the constructor
- Respects `extends` with clean `name` and `stack` properties
- `toJSON` returns a JSON representation
- Adds common HTTP error types with a `code` property

```bash
npm i @smallwins/err --save
```

### Bundled Error Types

- `err.BaseError`
- `err.InternalError`
- `err.DatabaseError`
- `err.NotFoundError`
- `err.NotAuthorizedError`

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

class CoffeeError extends err.BaseErr {
  constructor(params) {
    super(params)
    this.code = 500
  }
}

let e = new CoffeeError('lactose intolerant')
console.log(e.code) // logs 500
```

Get a clean JSON representation:

```javascript
console.log(e.toJSON())
// logs {name, code, message, stack}
```

Extend by `require`ing error directly:

```javascript
var Err = require('@smallwins/err/error')

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

console.log(err.Error('basic') instanceof Error)
// logs true

console.log(err.NotFound('not found err').toString())
// logs NotFound: not found err
```

### `@smallwins/err/oldschool` API

Factory functions which return real `Error` instances:

- `err.Error`
- `err.Internal`
- `err.Database`
- `err.NotFound`
- `err.NotAuthorized`

---

Runtime type checking fully supported. Check the tests.
