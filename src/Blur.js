const GL = require("gl-react");
const React = GL.React;
const {
  PropTypes
} = React;
const Blur1D = require("./Blur1D");

const NORM = Math.sqrt(2)/2;

// default directionForPass
function directionForPass (p, factor, total) {
  const f = factor * 2 * Math.ceil(p / 2) / total;
  switch ((p-1) % 4) { // alternate horizontal, vertical and 2 diagonals
  case 0: return [f,0];
  case 1: return [0,f];
  case 2: return [f*NORM,f*NORM];
  case 3: return [f*NORM,-f*NORM];
  }
}

module.exports = GL.createComponent(
  ({ width, height, factor, children, passes, directionForPass }) => {
    const rec = pass => pass <= 0 ? children :
    <Blur1D
      width={width}
      height={height}
      direction={directionForPass(pass, factor, passes)}>
      {rec(pass-1)}
    </Blur1D>;
    return rec(passes);
  },
  {
    displayName: "Blur",
    defaultProps: {
      passes: 2,
      directionForPass
    },
    propTypes: {
      width: PropTypes.number,
      height: PropTypes.number,
      factor: PropTypes.number.isRequired,
      children: PropTypes.any.isRequired,
      passes: PropTypes.number,
      directionForPass: PropTypes.func
    }
  });
