import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import red from '@material-ui/core/colors/red';
import { translate } from '../i18n';
import compose from 'recompose/compose';

const styles = theme => ({
  root: {
    marginBottom: 10
  },

  chip: {
    margin: theme.spacing.unit
  },

  venue: {
    // backgroundColor : red[500],
    // color : '#ffffff'
  }
});

const PresentationLabel = ({ time, venue, classes, translate }) => (
  <div className={classes.root}>
    <Chip label={time} className={classes.chip} />
    <Chip
      label={`Scena ${venue}`}
      className={classes.chip}
      classes={{
        root: classes.venue
      }}
    />
  </div>
);

const enhance = compose(
  withStyles(styles),
  translate
);

export default enhance(PresentationLabel);
