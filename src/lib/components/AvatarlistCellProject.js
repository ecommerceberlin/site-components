import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { resizeCloudinaryImage } from '../helpers';
import { MyLink } from '../next';

 
const useStyles = makeStyles( theme => ({
   
    root : {
      display: 'flex',
      flexDirection : 'column',
  //    alignItems: 'center',
  //    justifyContent: 'center',
      fontFamily: theme.typography.fontFamily,
      marginBottom: 30
    },
    person : {
      height: 80,
      overflow : 'hidden',
      textAlign : 'center',
      fontSize: theme.typography.pxToRem(15),
    },

    dataMask : {
      backgroundColor : '#eaeaea',
    },

    personSecondaryInfo : {
     // color: 'rgba(0, 0, 0, 0.64)'
      paddingTop: 10
    },

    tile: {
      height: 120,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'block',
      textIndent: -5000,
      marginTop : '0%',
      marginBottom : '0%',
      marginRight : '7%',
      marginLeft : '7%',


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
    votes : {
      fontWeight: 600,
      marginTop: 10
    }
    
}));


const AvatarlistCellProject = ({gridData, title, alt, image, href, moreLabel}) => {
  
    const classes = useStyles();

    const style = { 
      backgroundImage: `url(${resizeCloudinaryImage(image, 300, 300)})` 
     };
   
    // const votes = show_votes && "votes" in source ? source.votes : 0;
    
    return ( 
    
    <Grid item {...gridData} className={classes.root}>

        <div className={classes.tile} style={style}>{ alt }</div>

        <div className={classes.person}>
       
          <div className={classes.personSecondaryInfo}>{ title }</div> 
          {/* {votes ? <div className={classes.votes}>{`${votes} votes`}</div> : null} */}
        </div>

        {href && moreLabel && <MyLink href={href} label={moreLabel} variant="outlined" size="small" />}

      </Grid>
      )
}

AvatarlistCellProject.defaultProps = {
    gridData : {xs: 12, sm: 4, md: 3, lg: 2, xl: 2},
    title : "",
    alt : "",
    image: "",
    href: null,
    moreLabel : "awards.contestant.details"

}


export default AvatarlistCellProject
