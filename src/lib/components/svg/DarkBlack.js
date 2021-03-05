import React from 'react';

const DarkBlack = ({id}) => (
  <svg style={{position: "absolute", height:0}}>
  <defs>
    <filter id={id}>
    <feColorMatrix
      type = "matrix"
      values="0.22     0     0     0     0
              0     0.22     0     0     0
              0     0     0.22     0     0
              0     0     0     1     0 "/>
    </filter>
  </defs>
  </svg>
)


DarkBlack.defaultProps = {
  id: "svgFilter"
}

export default DarkBlack
