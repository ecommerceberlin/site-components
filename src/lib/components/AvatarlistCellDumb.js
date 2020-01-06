import React from 'react';
import Grid from '@material-ui/core/Grid';
import { resizeCloudinaryImage } from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MyLink } from '../next';
import isFunction from 'lodash/isFunction';
import { generateLinkParams } from '../helpers';


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


const AvatarlistCellDumb = ({gridData, classes, title, alt, source, image_source, link, moreLabel}) => {
  
    const style = image_source in source && source[image_source] ? { 
      backgroundImage: `url(${resizeCloudinaryImage(source[image_source], 300, 300)})` 
    } : {};

    const linkParams = isFunction(link) ? link(source) : {}
    const {as, href} = linkParams


    return ( 
    
    <Grid item {...gridData} className={classes.root}>

        <div className={classes.person}>
       
        <span className={classes.personSecondaryInfo}>{ title(source) }</span>
        
        </div>

        <div className={classes.tile} style={style}>{ alt(source) }</div>

           <MyLink {...linkParams} label={moreLabel} />

      </Grid>
      )
}

AvatarlistCellDumb.defaultProps = {
    gridData : {xs: 12, sm: 4, md: 3, lg: 2, xl: 2},
    source : {},
    image_source : "logotype",
    title : function(item){return "position" in item ? item.position : "undefined"; },
    alt : function(item){return "cname2" in item ? item.cname2 : "undefined"; },
    link: false,
    moreLabel : 'common.more'
}


//   SubPageLink.propTypes = {
//     id: PropTypes.number.isRequired,
//     subpage: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     src: PropTypes.string
//   };

export default withStyles(styles)(AvatarlistCellDumb)
