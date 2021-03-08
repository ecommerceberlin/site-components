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
    margin: theme.spacing(1)
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
      <Chip label={time} className={classes.chip} />
      <Chip
        label={`${translate("common.stage")} ${venue}`}
        className={classes.chip}
        classes={{
          root: classes.venue
        }}
      />
      {buttons}
    </div>
  );
}

export default PresentationLabel
