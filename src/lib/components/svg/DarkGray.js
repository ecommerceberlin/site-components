import React from 'react';

const DarkGray = () => (
  <svg style={{display: 'none'}}>
  <defs>
    <filter id="svgFilter">
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

export default DarkGray
