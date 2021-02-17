import React from 'react';

const Gold = ({id}) => (
  <svg style={{position: "absolute", height:0}}>
  <defs>
    <filter id={id}>
    <feColorMatrix
      type = "matrix"
      values="1     0     0     0     0
              0     0.84     0     0     0
              0     0     0     0     0
              0     0     0     1     0 " />
    </filter>
  </defs>
  </svg>
)

Gold.defaultProps = {
  id: "svgFilter"
}

export default Gold
