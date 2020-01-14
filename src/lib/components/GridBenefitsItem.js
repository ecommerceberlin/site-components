import React from 'react';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from './MyTypography'
// import Markdown from './Markdown'


import {
  FaWrench,
  FaHandshake,
  FaLockOpen,
  FaSearch,
  FaChartLine,
  FaPiggyBank,
  FaDotCircle,
  FaFastForward,
  FaChair,
  FaComments,
  FaSmile,
  FaLink,
  FaPoll,
  FaTrophy,
  FaLightbulb
} from 'react-icons/fa';


const styles = theme => ({

  container : {
    display: 'flex',
    flexDirection : 'row',
  //  alignItems : 'center'
    marginBottom : 30,
    [theme.breakpoints.up('md')]: {
      marginBottom : 60,
    },
  },

  iconContainer : {

  //  width: 150
  },

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

  texts : {
    marginLeft : 30
  }

})

const GridBenefitsItem = ({classes, icon, label}) => {


    const icons = {
      FaWrench,
      FaHandshake,
      FaLockOpen,
      FaSearch,
      FaChartLine,
      FaPiggyBank,
      FaDotCircle,
      FaFastForward,
      FaChair,
      FaComments,
      FaSmile,
      FaLink,
      FaPoll,
      FaTrophy,
      FaLightbulb
    }

    const ReactIcon = icon in icons ? icons[icon] : icons.FaWrench

    return (

      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>

        <div className={classes.container}>

          <div className={classes.iconContainer}>
           <ReactIcon className={classes.icon} />
          </div>

          <div className={classes.texts}>
            
            <Typography template="benefitsTitle" label={`${label}.title`} />

            <Typography template="benefitsText" label={`${label}.description`} />
        
          </div>

        </div>

      </Grid>

    ) 

}


GridBenefitsItem.defaultProps = {
  label : ""
}

export default withStyles(styles)(GridBenefitsItem)
