import React from 'react';
import Grid from '@material-ui/core/Grid';
// import { withStyles } from '@material-ui/core/styles';
import GridBenefitsItem from './GridBenefitsItem'
import Event from '@material-ui/icons/Event'


// const styles = theme => ({

//   icon : {
//     marginTop: -12,
//     fontSize : 50,

//     [theme.breakpoints.up('md')]: {
//       fontSize: 100
//     },
//   },

//   red: {
//     color: "red"
//   },

//   black: {
//     color: "black"
//   },

// })

//React.isValidElement(icons[icon])

const GridBenefits = ({items, baseLabel, icons, iconColor, iconSize}) => (<Grid  container spacing={8}>{items && items.map( ({label, icon}) => {
      const IconComponent = icon in icons ?  icons[icon]: Event;
      return ( <GridBenefitsItem key={label} icon={<IconComponent key={label} style={{color: iconColor, fontSize: iconSize}} /> } label={`${baseLabel}.${label}`} /> )
    })  }

  </Grid>)


GridBenefits.defaultProps = {
  items : [],
  baseLabel : "",
  icons: {},
  iconColor: "red",
  iconSize: "50"
}

GridBenefits.propTypes = {

}

export default (GridBenefits)
