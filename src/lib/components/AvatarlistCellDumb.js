import React from 'react';
import Grid from '@material-ui/core/Grid';
import { resizeCloudinaryImage } from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
   
    root : {
      display: 'flex',
      flexDirection : 'column',
  //    alignItems: 'center',
  //    justifyContent: 'center',
      fontFamily: theme.typography.fontFamily,
    },
    person : {
      textAlign : 'center',
    },
    tile: {
      height: 150,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'block',
      textIndent: -5000,
      marginLeft : '20%',
      marginRight : '20%',
  
      [theme.breakpoints.down('sm')]: {
        maxHeight: 100,
      }
  
  
    },
    
});

const AvatarlistCellDumb = ({classes, source}) => {
    const {fname, position, cname2, logotype} = source;
    const style = logotype ? { backgroundImage: `url(${resizeCloudinaryImage(logotype)})` } : {};

    return (  <Grid item xs={12} sm={6} md={4} lg={3} xl={3} className={classes.root}>

        <div className={classes.person}>{`${fname} ${position}`}</div>

        <div className={classes.tile} style={style}>
         {`test`}
        </div>

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
