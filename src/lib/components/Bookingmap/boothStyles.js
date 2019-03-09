


export const styleMapping = {

  [`${process.env.BOOTH_LIGHT}`] : "style1", //light
  [`${process.env.BOOTH_STANDARD}`] : "style2", //standard
  [`${process.env.BOOTH_HOT}`] : "style3", //hot
  [`${process.env.BOOTH_SUPERHOT}`] : "style4", //superhot
  [`${process.env.BOOTH_ULTRA}`] : "style5", //ultra
  [`${process.env.BOOTH_GRAND}`] : "style6", //grand
  [`${process.env.BOOTH_STAGE}`] : "style6"
}

export const getStylingName = (groupId) => {
  return groupId in styleMapping ? styleMapping[groupId] : "style1"
}

const styles = {

  booth: {
    position: 'absolute',
    display: 'table',

    backgroundColor: 'lightgreen',
    border: '1px solid green',
    color: 'black',

    zIndex: 20,
    borderRadius: 3,
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    textAlign: 'center',
    boxShadow: '1px 1px #555555',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },

  boothOnLegend : {
    position: 'relative',
    marginRight : 7,
    marginBottom: 7
  },
  
  boothHold: {
    backgroundColor: '#D3D3D3 !important',
    borderColor: '#999 !important',
    color: '#666666 !important'
  },

  boothSold: {
    backgroundColor: '#D3D3D3 !important',
    borderColor: '#999 !important',
    color: '#666666 !important'
  },

  boothUnavailable: {
    backgroundColor: '#666666 !important',
    borderSize: 0,
    boxShadow : 'none'
  },

  boothSelected: {
    backgroundColor: 'blue !important',
    color: 'white !important',
    border: '3px solid black !important'
  },

  boothText: {
    display: 'table-cell',
    verticalAlign: 'middle',
    lineHeight: 'normal',
    fontWeight: 600,
    fontFamily: 'verdana, arial, sans-serif',
    fontSize: 8
  },

  boothLogotype: {},

  cname: {
    display: 'block'
  },


  style1: {
    backgroundColor: "#5fe85d",
    color :  "#ffffff",
    borderColor: "#4bb749",
  },

  style2: {
    backgroundColor: "#55cf52",
    color :  "#ffffff",
    borderColor: "#409c3e"
  },

  style3: {
    backgroundColor: "#4bb749",
    color :  "#ffffff",
    borderColor: "#358234"
  },

  style4: {
    backgroundColor: "#409c3e",
    color :  "#ffffff",
    borderColor: "#004500"
  },

  style5: {
    backgroundColor: "#358234",
    color :  "#ffffff",
    borderColor: "#004500"
  },

  style6 : {
    backgroundColor: "#30bfca",
    color :  "#ffffff",
    borderColor: "#1e7980"

  },


}


export default styles
