import React from 'react';

const Red = ({id}) => (
  <svg style={{display: 'none'}}>
  <defs>
    <filter id={id}>
      <feColorMatrix
        type = "matrix"
        values="1     0     0     0     0
                0     0.16     0     0     0
                0     0     0     0     0
                0     0     0     1     0 "/>
    </filter>
  </defs>
  </svg>
)


Red.defaultProps = {
  id: "svgFilter"
}


export default Red
