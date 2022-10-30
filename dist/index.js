function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styled = _interopDefault(require('styled-components'));

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  strings.raw = raw;
  return strings;
}

var _templateObject;
var Layer = React__default.memo(function (_ref) {
  var index = _ref.index,
    opacity = _ref.opacity,
    transform = _ref.transform,
    children = _ref.children;
  return React__default.createElement(StyledLayer, {
    style: _objectSpread2({
      '--transform': transform,
      '--opacity': opacity
    }, index >= 1 && backLayersStyle)
  }, children);
});
var backLayersStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  pointerEvents: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  WebkitUserSelect: 'none',
  userSelect: 'none'
};
var StyledLayer = styled.span(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  display: inline-block;\n  opacity: var(--opacity);\n  transform: var(--transform);\n"])));

var Layers = React__default.memo(function (_ref) {
  var _depth$match$, _depth$match;
  var layers = _ref.layers,
    fade = _ref.fade,
    children = _ref.children,
    direction = _ref.direction,
    depth = _ref.depth;
  var depthUnit = (_depth$match$ = (_depth$match = depth.match(/[a-z]+/)) === null || _depth$match === void 0 ? void 0 : _depth$match[0]) !== null && _depth$match$ !== void 0 ? _depth$match$ : '';
  var getDirection = React__default.useCallback(function (pct) {
    var depthNumeral = parseFloat(depth.replace(depthUnit, ''));
    if (direction === 'backwards') {
      return -pct * depthNumeral;
    }
    if (direction === 'both') {
      return -(pct * depthNumeral) + depthNumeral / 2;
    }
    if (direction === 'forwards') {
      return -(pct * depthNumeral) + depthNumeral;
    }
    return null;
  }, [depthUnit]);
  var renderLayers = React.useMemo(function () {
    return Array(layers).fill(0).map(function (_, i) {
      var pct = i / layers;
      var transform = "translateZ(" + getDirection(pct) + depthUnit + ")";
      var opacity = fade ? (1 - pct) / 2 : 1;
      return React__default.createElement(Layer, {
        key: i,
        index: i,
        opacity: opacity,
        transform: transform
      }, children);
    });
  }, []);
  return React__default.createElement(React.Fragment, null, renderLayers);
});

var _templateObject$1, _templateObject2;
var Ztext = function Ztext(props) {
  var layersWrapperRef = React__default.useRef(null);
  var tilt = React__default.useCallback(function (xPct, yPct) {
    var _props$eventRotation$, _props$eventRotation, _props$eventRotation$2, _layersWrapperRef$cur;
    var eventRotationUnit = (_props$eventRotation$ = (_props$eventRotation = props.eventRotation) === null || _props$eventRotation === void 0 ? void 0 : (_props$eventRotation$2 = _props$eventRotation.match(/[a-z]+/)) === null || _props$eventRotation$2 === void 0 ? void 0 : _props$eventRotation$2[0]) !== null && _props$eventRotation$ !== void 0 ? _props$eventRotation$ : '';
    var eventRotationNumeral = parseFloat(props.eventRotation.replace(eventRotationUnit, ''));
    var eventDirectionAdj = null;
    if (props.eventDirection === 'reverse') {
      eventDirectionAdj = -1;
    } else {
      eventDirectionAdj = 1;
    }
    var xTilt = xPct * eventRotationNumeral * eventDirectionAdj;
    var yTilt = -yPct * eventRotationNumeral * eventDirectionAdj;
    var transform = "rotateX(" + yTilt + eventRotationUnit + ") rotateY(" + xTilt + eventRotationUnit + ")";
    (_layersWrapperRef$cur = layersWrapperRef.current) === null || _layersWrapperRef$cur === void 0 ? void 0 : _layersWrapperRef$cur.style.setProperty('--transform', transform);
  }, [props.eventDirection]);
  React__default.useEffect(function () {
    if (props.event === 'pointer') {
      window.addEventListener('mousemove', function (e) {
        var xPct = (e.clientX / window.innerWidth - 0.5) * 2;
        var yPct = (e.clientY / window.innerHeight - 0.5) * 2;
        tilt(xPct, yPct);
      }, false);
      window.addEventListener('touchmove', function (e) {
        var xPct = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        var yPct = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        tilt(xPct, yPct);
      }, false);
    }
  }, [props.event]);
  return React__default.createElement(Wrapper, {
    style: _objectSpread2({
      '--perspective': props.perspective
    }, props.style)
  }, React__default.createElement(LayersWrapper, {
    ref: layersWrapperRef
  }, React__default.createElement(Layers, {
    layers: props.layers,
    direction: props.direction,
    depth: props.depth,
    fade: props.fade
  }, props.children)));
};
Ztext.defaultProps = {
  depth: '1rem',
  direction: 'both',
  event: 'pointer',
  eventRotation: '30deg',
  eventDirection: 'default',
  fade: false,
  layers: 10,
  perspective: '500px'
};
var Wrapper = styled.div(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteralLoose(["\n  display: inline-block;\n  position: relative;\n  perspective: var(--perspective);\n"])));
var LayersWrapper = styled.span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n  display: inline-block;\n  transform-style: preserve-3d;\n  transform: var(--transform);\n"])));

module.exports = Ztext;
//# sourceMappingURL=index.js.map
