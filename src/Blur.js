const GL = require("gl-react");
const React = require("react");
const {
  PropTypes
} = React;
const Blur1D = require("./Blur1D");
const directionForPassDefault = require("./directionForPassDefault");

module.exports = GL.createComponent(
  ({ width, height, pixelRatio, factor, children, passes, directionForPass }) => {
    const rec = pass => pass <= 0 ? children :
    <Blur1D
      width={width}
      height={height}
      pixelRatio={pixelRatio}
      direction={directionForPass(pass, factor, passes)}>
      {rec(pass-1)}
    </Blur1D>;
    return rec(passes);
  },
  {
    displayName: "Blur",
    defaultProps: {
      passes: 2,
      directionForPass: directionForPassDefault
    },
    propTypes: {
      factor: PropTypes.number.isRequired,
      children: PropTypes.any.isRequired,
      passes: PropTypes.number,
      directionForPass: PropTypes.func,
      width: PropTypes.any,
      height: PropTypes.any,
      pixelRatio: PropTypes.number
    }
  });
