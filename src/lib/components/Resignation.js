import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { translate } from '../i18n';
import compose from 'recompose/compose';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },

  button: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(25),
      padding: '10px 28px'
    },

    backgroundColor : 'red',

    // fontWeight: theme.typography.fontWeightRegular,
    // fontFamily : theme.typography.fontFamily,
    // lineHeight : theme.typography.pxToRem(23),
  }
});

const Resignation = ({ code, classes, translate, label }) => {
  return (
    <div className={classes.root}>
      <Button
        href={`https://api.eventjuicer.com/v1/services/resignation/${code}`}
        target="_blank"
        variant="outlined"
        size="medium"
        color="default"
        className={classes.button}
      >
        {translate(label)}
      </Button>
    </div>
  );
};

Resignation.defaultProps = {
  label: 'visitors.tickets.resignation'
};

const enhance = compose(
  withStyles(styles),
  translate
);

export default enhance(Resignation);
