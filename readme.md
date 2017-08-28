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

Runtime type checking fully supported. Check the tests.
