import camelCase from 'lodash/camelCase'

 export function getStylingName(boothStyleMapping, groupId){

    return groupId in boothStyleMapping ? camelCase(boothStyleMapping[groupId]) : "";
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

  boothBlocked: {
    backgroundColor: '#eeee14 !important',
    borderSize: 0,
    boxShadow : 'none',
    color: '#333 !important'
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


  light: {
    backgroundColor: "#5fe85d",
    color :  "#ffffff",
    borderColor: "#4bb749",
  },

  standard: {
    backgroundColor: "#55cf52",
    color :  "#ffffff",
    borderColor: "#409c3e"
  },

  hot: {
    backgroundColor: "#4bb749",
    color :  "#ffffff",
    borderColor: "#358234"
  },

  superHot: {
    backgroundColor: "#409c3e",
    color :  "#ffffff",
    borderColor: "#004500"
  },

  grand: {
    backgroundColor: "#358234",
    color :  "#ffffff",
    borderColor: "#004500"
  },

  premiumGrand: {
    backgroundColor: "#34827a",
    color :  "#ffffff",
    borderColor: "#004500"
  },

  
  networking : {
    backgroundColor: "#30bfca",
    color :  "#ffffff",
    borderColor: "#1e7980"

  },

  stage : {
    backgroundColor: "#30bfca",
    color :  "#ffffff",
    borderColor: "#1e7980"

  },


}


export default styles
