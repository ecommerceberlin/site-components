import React from 'react';
import { translate } from '../i18n';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

const styles = theme => ({
  root: {
    backgroundColor: '#F5F5F5',
    padding: 5,
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: theme.typography.fontFamily,
    textAlign: 'center'
  }
});

const ScheduleBreak = ({ label, translate, classes }) => {
  return <div className={classes.root}>{translate(`schedule.${label}`)}</div>;
};

const enhance = compose(
  withStyles(styles),
  translate
);

export default enhance(ScheduleBreak);
