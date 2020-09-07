import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
import GridBenefitsItem from './GridBenefitsItem'
import Event from '@material-ui/icons/Event'

const styles = theme => ({

  icon : {
    marginTop: -12,
    width : 50,
    height : 50,

    [theme.breakpoints.up('md')]: {
      width : 60,
      height : 60,
    },

    color : 'red'
  },

})

//React.isValidElement(icons[icon])

const GridBenefits = ({items, baseLabel, icons, classes}) => (

  <Grid  container spacing={8}>

    {items && items.map( ({label, icon}) => {
      const IconComponent = icon in icons ?  icons[icon]: Event;
      return ( <GridBenefitsItem key={label} icon={<IconComponent className={classes.icon} /> } label={`${baseLabel}.${label}`} /> )
    })  }

  </Grid>
)


GridBenefits.defaultProps = {
  items : [],
  baseLabel : "",
  icons: {}
}

GridBenefits.propTypes = {

}

export default withStyles(styles)(GridBenefits)
