import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PresenterLogotype from './PresenterLogotype';
import PresenterAvatar from './PresenterAvatar';
import { usePresentation } from './context';

const useStyles = props => makeStyles(theme => ({
  root: {
  },
  columnWithLogotype: {
    width: 160,
  },
  
}));

const ScheduleItemPresenter = () => {

  const classes = useStyles()

  const {venues_count, selectedVenue} = usePresentation()

  if(venues_count > 2 && !selectedVenue){
    return (<PresenterAvatar />)
  }

  return (
    <Grid container spacing={1} className={classes.root} alignItems="center">
      <Grid item className={classes.columnWithLogotype}>
        <PresenterLogotype />
      </Grid>
      <Grid item>
        <PresenterAvatar />
      </Grid>
    </Grid>
  );
};


export default ScheduleItemPresenter