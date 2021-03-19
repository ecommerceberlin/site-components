import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';



const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 20,
    [theme.breakpoints.down("md")]: {
      marginBottom: 10,
    }
  },

 
  avatar: {

    height: 80,
    width: 80,

    [theme.breakpoints.down("md")]: {
      height: 50,
      width: 50,
    }
  }
}));

const ScheduleItemPresenter = ({ title, text, imageSrc }) => {

  const classes = useStyles()
    
  return (
    <Grid container spacing={1} className={classes.root} alignItems="center" wrap="nowrap">
    <Grid item>
      <Avatar
        aria-label="Presenter"
        className={classes.avatar}
        src={imageSrc}
      />
    </Grid>
    <Grid item>{title} {text}</Grid>
    </Grid>
  );
};

ScheduleItemPresenter.defaultProps = {
  raised: false
};



export default ScheduleItemPresenter