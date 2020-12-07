import React from 'react';

const DarkGray = ({id}) => (
  <svg style={{display: 'none'}}>
  <defs>
    <filter id={id}>
    <feColorMatrix
      type = "matrix"
      values="0.5     0     0     0     0
              0     0.5     0     0     0
              0     0     0.5     0     0
              0     0     0     1     0 "/>
    </filter>
  </defs>
  </svg>
)

DarkGray.defaultProps = {
  id: "svgFilter"
}

export default DarkGray
