import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { 
    getSpeakerLogotype
 } from '../helpers';

const useStyles = makeStyles((theme) => ({
    logotype: {
        // width: 100,
        // height: 100,
    
        // [theme.breakpoints.up('sm')]: {
        //   width: 250,
        //   height: 250
        // },
    
        maxWidth: 300, 
        maxHeight: 200, 
        marginTop: 30

      },
    
      tinyLogotype: {
        maxWidth: 180, 
        maxHeight: 80, 
        margin: 20,

        [theme.breakpoints.down('lg')]: {
            maxWidth: 150,
            maxHeight: 50,
            marginRight: "auto",
            marginLeft: "auto",
        },

        [theme.breakpoints.down('md')]: {
            maxWidth: 150,
            maxHeight: 50,
            marginRight: 15,
            marginLeft: 15,
        },

      },
    
      image: {
        filter: 'grayscale(100%) contrast(115%)'
      }
  }));

const ProfileLogotype = ({data, tiny}) => {

    const classes = useStyles();

    if(!"logotype" in data){
        return <CircularProgress />
    }

    return (<img
        src={getSpeakerLogotype(data)}
        alt=""
        className={tiny ? classes.tinyLogotype : classes.logotype}
        />)

}

ProfileLogotype.defaultProps = {
    data: {

    },
    tiny: false
}

export default ProfileLogotype