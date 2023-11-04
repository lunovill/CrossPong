'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./three-custom-shader-material.cjs.prod.js");
} else {
  module.exports = require("./three-custom-shader-material.cjs.dev.js");
}
