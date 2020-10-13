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
        maxWidth: 200, 
        maxHeight: 100, 
        margin: 10
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