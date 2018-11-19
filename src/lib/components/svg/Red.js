const Red = () => (
  <svg style={{display: 'none'}}>
  <defs>
    <filter id="svgRedFilter">
      <feColorMatrix
        type = "matrix"
        values="1     0     0     0     0
                0     0     0     0     0
                0     0     0     0     0
                0     0     0     1     0 "/>
    </filter>
  </defs>
  </svg>
)

export default Red
