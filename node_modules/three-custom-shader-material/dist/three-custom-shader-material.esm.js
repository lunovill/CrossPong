import { _ as _objectWithoutProperties, C as CustomShaderMaterial$1, a as _objectSpread2 } from './vanilla-307d3a93.esm.js';
import * as React from 'react';
import 'object-hash';
import 'three';
import 'glsl-tokenizer';
import 'glsl-token-string';
import 'glsl-token-functions';

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
var CustomShaderMaterial = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var baseMaterial = _ref.baseMaterial,
    fragmentShader = _ref.fragmentShader,
    vertexShader = _ref.vertexShader,
    uniforms = _ref.uniforms,
    cacheKey = _ref.cacheKey,
    _ref$attach = _ref.attach,
    attach = _ref$attach === void 0 ? 'material' : _ref$attach,
    props = _objectWithoutProperties(_ref, _excluded);
  var updateProps = React.useMemo(function () {
    return {
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      uniforms: uniforms,
      cacheKey: cacheKey
    };
  }, [fragmentShader, vertexShader, uniforms, cacheKey]);
  var material = React.useMemo(function () {
    return new CustomShaderMaterial$1(_objectSpread2(_objectSpread2({
      baseMaterial: baseMaterial
    }, updateProps), props));
  }, [baseMaterial, updateProps]);
  React.useEffect(function () {
    return function () {
      return material.dispose();
    };
  }, [material]);

  // TODO: Use .update when it stop leaking memory
  // useDidUpdateEffect(
  //   () => material.update(updateProps),
  //   [updateProps]
  // )

  return /*#__PURE__*/React.createElement("primitive", _extends({
    object: material,
    ref: ref,
    attach: attach
  }, props));
});

export { CustomShaderMaterial as default };
