'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vanilla_dist_threeCustomShaderMaterialVanilla = require('./vanilla-ff293b2e.cjs.dev.js');
var React = require('react');
require('object-hash');
require('three');
require('glsl-tokenizer');
require('glsl-token-string');
require('glsl-token-functions');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var _excluded = ["baseMaterial", "fragmentShader", "vertexShader", "uniforms", "cacheKey", "attach"];
// function useDidUpdateEffect(fn: (...opts: any[]) => any, inputs: React.DependencyList) {
//   const didMountRef = React.useRef(false)

//   React.useEffect(() => {
//     if (didMountRef.current) {
//       return fn()
//     }
//     didMountRef.current = true
//   }, inputs)
// }
var CustomShaderMaterial = /*#__PURE__*/React__namespace.forwardRef(function (_ref, ref) {
  var baseMaterial = _ref.baseMaterial,
    fragmentShader = _ref.fragmentShader,
    vertexShader = _ref.vertexShader,
    uniforms = _ref.uniforms,
    cacheKey = _ref.cacheKey,
    _ref$attach = _ref.attach,
    attach = _ref$attach === void 0 ? 'material' : _ref$attach,
    props = vanilla_dist_threeCustomShaderMaterialVanilla._objectWithoutProperties(_ref, _excluded);
  var updateProps = React__namespace.useMemo(function () {
    return {
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      uniforms: uniforms,
      cacheKey: cacheKey
    };
  }, [fragmentShader, vertexShader, uniforms, cacheKey]);
  var material = React__namespace.useMemo(function () {
    return new vanilla_dist_threeCustomShaderMaterialVanilla.CustomShaderMaterial(vanilla_dist_threeCustomShaderMaterialVanilla._objectSpread2(vanilla_dist_threeCustomShaderMaterialVanilla._objectSpread2({
      baseMaterial: baseMaterial
    }, updateProps), props));
  }, [baseMaterial, updateProps]);
  React__namespace.useEffect(function () {
    return function () {
      return material.dispose();
    };
  }, [material]);

  // TODO: Use .update when it stop leaking memory
  // useDidUpdateEffect(
  //   () => material.update(updateProps),
  //   [updateProps]
  // )

  return /*#__PURE__*/React__namespace.createElement("primitive", _extends({
    object: material,
    ref: ref,
    attach: attach
  }, props));
});

exports["default"] = CustomShaderMaterial;
