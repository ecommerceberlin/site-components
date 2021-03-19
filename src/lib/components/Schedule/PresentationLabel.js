import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
// import red from '@material-ui/core/colors/red';
import { useTranslate } from '../../i18n';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 10
  },

  chip: {
    marginRight: 15,
    [theme.breakpoints.down("md")]: {
      marginRight: 5,
    }
  },

  stageLabel: {
    [theme.breakpoints.down("md")]: {
      display: 'none'
    }
  },

  venue: {
    // backgroundColor : red[500],
    // color : '#ffffff'
  }
}));

const PresentationLabel = ({ time="", venue="", buttons = null }) => {

  const [translate] = useTranslate();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip 
        label={time} 
        className={classes.chip} 
        variant="outlined"
      />
      <Chip
        label={<><span className={classes.stageLabel}>{`${translate("common.stage")} `}</span>{venue}</>}
        className={classes.chip}
        classes={{
          root: classes.venue
        }}
        variant="outlined"
      />
      {buttons}
    </div>
  );
}

export default PresentationLabel
