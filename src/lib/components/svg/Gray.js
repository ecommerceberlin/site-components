import React from 'react';

const Gray = () => (
  <svg style={{display: 'none'}}>
  <defs>
    <filter id="svgFilter">
    <feColorMatrix
      type = "matrix"
      values="0.67     0     0     0     0
              0     0.67     0     0     0
              0     0     0.67     0     0
              0     0     0     1     0 "/>
    </filter>
  </defs>
  </svg>
)

export default Gray
