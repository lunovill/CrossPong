# glsl-token-functions

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Extract function definitions from an array of GLSL tokens from [glsl-tokenizer](https://github.com/stackgl/glsl-tokenizer).

You can use this to grab all of the functions in a shader, along with their arguments, return value and name.

## Usage

[![NPM](https://nodei.co/npm/glsl-token-functions.png)](https://www.npmjs.com/package/glsl-token-functions)

### `functions = tokenFunctions(tokens)`

Given an array of `tokens` produced by [glsl-tokenizer](https://github.com/stackgl/glsl-tokenizer), return an array of function data in the following format:

``` javascript
{
  name: 'functionName',
  type: 'vec4'
  body: [100, 110],
  args: [98, 99],
  outer: [80, 111]
}
```

#### `fn.name`

The function name. For example, the following function would be `main`:

``` glsl
void main();
```

#### `fn.type`

The function return type. For example, the following function would be `vec2`:

``` glsl
vec2 getModel(vec3 p);
```

Note that this supports structs too! The following function's `type` would be `Ray`:

``` glsl
struct Ray {
  vec3 ro;
  vec3 rd;
}

Ray getCamera(vec3 origin);
```

#### `fn.body`

The start and end index in the original tokens array of the function body, i.e. the part between the curly braces. If the function doesn't have a body, this will be `false`.

For example:

``` javascript
const tokenFunctions = require('glsl-token-functions')
const toString = require('glsl-token-string')
const tokenize = require('glsl-tokenizer')
const src = `
void main();
void main() { gl_FragColor = vec4(1); }
`

const tokens = tokenize(src)
const functions = tokenFunctions(tokens)

console.log(getBody(functions[0])) // false
console.log(getBody(functions[1])) // " gl_FragColor = vec4(1); "

function getBody () {
  return toString(tokens.slice(fn.body[0], fn.body[1]))
}
```

#### `fn.args`

The start and end index in the original tokens array of the function arguments, i.e. the part including the parenthesis in the function definition.

For example:

``` javascript
const tokenFunctions = require('glsl-token-functions')
const toString = require('glsl-token-string')
const tokenize = require('glsl-tokenizer')
const src = `
void main();
void drawImage(vec3 ro, vec3 rd);
`

const tokens = tokenize(src)
const functions = tokenFunctions(tokens)

console.log(getArgs(functions[0])) // "()"
console.log(getArgs(functions[1])) // "(vec3 ro, vec3 rd)"

function getArgs () {
  return toString(tokens.slice(fn.args[0], fn.args[1]))
}
```

#### `fn.outer`

The start and end index in the original tokens array of the entire function.

For example:

``` javascript
const tokenFunctions = require('glsl-token-functions')
const toString = require('glsl-token-string')
const tokenize = require('glsl-tokenizer')
const src = `
void main();
void main() { gl_FragColor = vec4(1); }
`

const tokens = tokenize(src)
const functions = tokenFunctions(tokens)

console.log(getOuter(functions[0])) // "void main();"
console.log(getOuter(functions[1])) // "void main() { gl_FragColor = vec4(1); }"

function getOuter () {
  return toString(tokens.slice(fn.outer[0], fn.outer[1]))
}
```

## Contributing

See [stackgl/contributing](https://github.com/stackgl/contributing) for details.

## License

MIT. See [LICENSE.md](http://github.com/stackgl/glsl-token-functions/blob/master/LICENSE.md) for details.
