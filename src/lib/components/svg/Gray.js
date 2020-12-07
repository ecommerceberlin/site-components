import React from 'react';

const Gray = ({id}) => (
  <svg style={{display: 'none'}}>
  <defs>
    <filter id={id}>
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


Gray.defaultProps = {
  id: "svgFilter"
}


export default Gray
