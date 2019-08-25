import React from 'react';
import Grid from '@material-ui/core/Grid';
import { resizeCloudinaryImage } from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
   
   
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

//


const AvatarlistCellExternal = ({classes, source, dense}) => {

    const {cname2, website, logotype} = source;
  
    const style = logotype ? { backgroundImage: `url(${resizeCloudinaryImage(logotype, 300, 300)})` } : {};

    return (  <Grid item {...dense} >

        <a href={website} rel="nofollow" target="_blank" className={classes.tile} style={style}>
         {cname2}
        </a>

        </Grid>
      )
}


AvatarlistCellExternal.defaultProps = {
    dense : {
        xs : 12, 
        sm : 4,
        md : 3,
        lg: 2,
        xl : 2
    },
    wide : {
        xs : 12,
        sm : 6,
        md : 4,
        lg : 3,
        xl : 3
    }
  };
  
//   SubPageLink.propTypes = {
//     id: PropTypes.number.isRequired,
//     subpage: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     src: PropTypes.string
//   };

export default withStyles(styles)(AvatarlistCellExternal)
