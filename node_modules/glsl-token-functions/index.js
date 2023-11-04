module.exports = functions

function functions (tokens) {
  var returnType = null
  var defnName = null
  var braceDepth = 0
  var braceStart = 0
  var defnStart = 0
  var argFinish = 0
  var argStart = 0
  var output = []
  var i, j, token

  // The following loop detects functions with bodies of any type,
  // including structs. e.g.
  // void main() {...}
  // vec4 fn(vec3 a) {...}
  // Ray3 fn(vec3 ro, vec3 rd) {...}
  for (i = 0, j; i < tokens.length; i++) {
    token = tokens[i]
    if (token.data === '{') {
      // If already in a function, keep track of opening braces
      if (braceDepth && braceDepth++) continue

      // Stepping backwards from the closing brace, find the end
      // of the arguments list. There should only be whitespace on
      // the way there.
      j = findPrevious(i, findOp(')'), findOp())
      if (j < 0) continue
      argFinish = j

      // Step backwards to find the beginning of the arguments list. If there's
      // a nested paranthesis in there, then it's definitely not a function.
      j = findPrevious(j, findOp('('), findOp(')'))
      if (j < 0) continue
      argStart = j

      // Continue stepping backwards past any whitespace to find the
      // function name. If the token isn't an identifier then it's not a
      // function so we bail
      j = findPrevious(j, findGlyph)
      if (j < 0) continue
      if (tokens[j].type !== 'ident') continue
      defnName = tokens[j].data

      // The next non-whitespace token should be the return type of
      // the function
      j = findPrevious(j, findGlyph)
      if (j < 0) continue

      braceDepth = 1
      braceStart = i
      returnType = tokens[j].data
      defnStart = j

      // There are cases when a function definition includes a
      // precision qualifier, e.g. highp float random();
      // So we backtrack one extra step to check if that's the
      // case, and handle it :)
      var k = findPrevious(j, findGlyph)
      switch (tokens[k] && tokens[k].data) {
        case 'lowp':
        case 'highp':
        case 'mediump':
          defnStart = k
      }
    } else
    if (braceDepth && token.data === '}') {
      if (--braceDepth) continue

      output.push({
        name: defnName,
        type: returnType,
        body: [braceStart + 1, i],
        args: [argStart, argFinish + 1],
        outer: [defnStart, i + 1]
      })
    }
  }

  // This loop is for handling the edge case of functions defined
  // without a body. Generally, this body is defined later in the file.
  // void main();
  // vec2 doModel(vec3 p);
  // Note the replacement of curly braces with a semicolon.
  for (i = 0; i < tokens.length; i++) {
    token = tokens[i]
    if (token.data === ';') {
      // Like before, we start from a semicolon and find the
      // bounds of the argument list to find the function name
      j = findPrevious(i, findOp(')'), findOp())
      if (j < 0) continue
      argFinish = j
      j = findPrevious(j, findOp('('), findOp(')'))
      if (j < 0) continue
      argStart = j
      j = findPrevious(j, findGlyph)
      if (j < 0) continue
      if (tokens[j].type !== 'ident') continue
      defnName = tokens[j].data

      // Try and find an ident or builtin character, which should be
      // our return type. If so, it'll be the very first preceding glyph.
      j = findPrevious(j, findGlyph)
      if (j < 0) continue
      if (tokens[j].type === 'operator') continue
      if (tokens[j].data === 'return') continue
      returnType = tokens[j].data

      output.push({
        name: defnName,
        type: returnType,
        body: false,
        args: [argStart, argFinish + 1],
        outer: [j, i + 1]
      })
    }
  }

  return output.sort(function (a, b) {
    return a.outer[0] - b.outer[0]
  })

  function findPrevious (start, match, bail) {
    for (var i = start - 1; i >= 0; i--) {
      if (match(tokens[i])) return i
      if (bail && bail(tokens[i])) return -1
    }

    return -1
  }
}

function findOp (data) {
  return function (token) {
    return token.type === 'operator' && (!data || token.data === data)
  }
}

function findGlyph (token) {
  return token.type !== 'whitespace'
}
