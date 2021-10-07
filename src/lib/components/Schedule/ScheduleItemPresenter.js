import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import {useSettings} from '../../helpers'
import {VenueSelector} from './redux'
import { useSelector } from 'react-redux'
import size from 'lodash/size'

const useStyles = props => makeStyles(theme => ({
  root: {
  },

  columnWithLogotype: {
    width: 160,
  },

  logotypeContainer: {

    height: 50,
    width: 140,
    marginRight: 10,
    marginLeft: 10,

    [theme.breakpoints.down("md")]: {
      // height: 50,
      // width: 50,
    }
  },
  logotypeImage: {
    objectFit: "contain",
    height: '85%',
  },
 
  avatar: {

    height: 50,
    width: 50,

    [theme.breakpoints.down("md")]: {
      height: 50,
      width: 50,
    }
  }
}));


const ScheduleItemPresenterAvatar = ({imageSrc, title, text}) => {

  const classes = useStyles({})()

  return (<Grid container spacing={1} alignItems="center" wrap="nowrap">
  <Grid item>
    <Avatar
      aria-label="Presenter"
      className={classes.avatar}
      src={imageSrc}
    />
  </Grid>
  <Grid item>{title} {text}</Grid>
</Grid>)
}

const ScheduleItemPresenter = ({ setting, logotype, ...rest }) => {

  const classes = useStyles({})()
  const {venues} = useSettings(setting)
  const selectedVenue = useSelector(VenueSelector) //A, B...

  if(size(venues) > 2 && !selectedVenue){

    return (
      <ScheduleItemPresenterAvatar {...rest} />
    )
  }


  return (
    <Grid container spacing={1} className={classes.root} alignItems="center">

    <Grid item className={classes.columnWithLogotype}>
    
    <Avatar
      variant="square"
      aria-label="Logotype"
      classes={{
        root: classes.logotypeContainer,
        img: classes.logotypeImage
      }}
      src={logotype}
    />

    </Grid>

    <Grid item>

      <ScheduleItemPresenterAvatar {...rest} />

    </Grid>
  
    </Grid>
  );
};

ScheduleItemPresenter.defaultProps = {
  raised: false
};



export default ScheduleItemPresenter