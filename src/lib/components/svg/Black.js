import React from 'react';

const Black = () => (
  <svg style={{display: 'none'}}>
  <defs>
    <filter id="svgFilter">
    <feColorMatrix
      type = "matrix"
      values="0.39     0     0     0     0
              0     0.39     0     0     0
              0     0     0.39     0     0
              0     0     0     1     0 "/>
    </filter>
  </defs>
  </svg>
)

export default Black
