const GL = require("gl-react");
const React = require("react");
const {
  PropTypes
} = React;
const BlurV1D = require("./BlurV1D");
const directionForPassDefault = require("./directionForPassDefault");

module.exports = GL.createComponent(
  ({ width, height, map, pixelRatio, factor, children, passes, directionForPass }) => {
    const rec = pass => pass <= 0 ? children :
    <BlurV1D
      width={width}
      height={height}
      map={map}
      pixelRatio={pixelRatio}
      direction={directionForPass(pass, factor, passes)}>
      {rec(pass-1)}
    </BlurV1D>;
    return rec(passes);
  },
  {
    displayName: "BlurV",
    defaultProps: {
      passes: 2,
      directionForPass: directionForPassDefault
    },
    propTypes: {
      factor: PropTypes.number.isRequired,
      children: PropTypes.any.isRequired,
      passes: PropTypes.number,
      directionForPass: PropTypes.func,
      map: PropTypes.any.isRequired,
      width: PropTypes.any,
      height: PropTypes.any,
      pixelRatio: PropTypes.number
    }
  });
