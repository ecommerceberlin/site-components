import React from 'react';
import Grid from '@material-ui/core/Grid';
import { resizeCloudinaryImage } from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import repeat from 'lodash/repeat'
import random from 'lodash/random'

const styles = theme => ({
   
    root : {
      display: 'flex',
      flexDirection : 'column',
  //    alignItems: 'center',
  //    justifyContent: 'center',
      fontFamily: theme.typography.fontFamily,
    },
    person : {
      height: 60,
      overflow : 'hidden',
      textAlign : 'center',
      fontSize: theme.typography.pxToRem(15),
    },

    dataMask : {
      backgroundColor : '#eaeaea',
    },

    personSecondaryInfo : {
     // color: 'rgba(0, 0, 0, 0.64)'
    
    },

    tile: {
      height: 150,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'block',
      textIndent: -5000,
      marginTop : '20%',
      marginBottom : '20%',
      marginRight : '10%',
      marginLeft : '10%',


      [theme.breakpoints.down('md')]: {
        marginTop : 20,
        marginBottom : 20,
      },

      [theme.breakpoints.down('sm')]: {
        height: 120,
      },

      [theme.breakpoints.down('xs')]: {
        height: 100,
      }
  
  
    },
    
});


const AvatarlistCellDumb = ({classes, source}) => {

    const {fname, position, cname2, logotype} = source;
  
    const style = logotype ? { backgroundImage: `url(${resizeCloudinaryImage(logotype, 300, 300)})` } : {};

    return ( 
    
    <Grid item xs={12} sm={4} md={3} lg={2} xl={2} className={classes.root}>

        <div className={classes.person}>
        
        {/*
         {fname} <span className={classes.dataMask}>{ repeat('\u00A0', random(8, 20) )}</span><br/>
         */}
        <span className={classes.personSecondaryInfo}>{position}</span></div>

        <div className={classes.tile} style={style}>{cname2}</div>

      </Grid>
      )
}


// SubPageLink.defaultProps = {
//     src: '',
//     name: '',
//     id: 0,
//     highlighted : null
//   };
  
//   SubPageLink.propTypes = {
//     id: PropTypes.number.isRequired,
//     subpage: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     src: PropTypes.string
//   };

export default withStyles(styles)(AvatarlistCellDumb)
