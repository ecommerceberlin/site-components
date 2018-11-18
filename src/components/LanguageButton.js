import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import classNames from 'classnames'
import Button from '@material-ui/core/Button';

import {translate, changeLocale} from '../i18n'

import { withStyles } from '@material-ui/core/styles';

import {
  dialogHide
} from './redux/actions';


const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  }
});


const LanguageButton = ({ target, classes, previousLocale, dialogHide, changeLocale, translate }) => (

  <Button
    variant="outlined"
    onClick={() => {
      changeLocale(target)
      dialogHide()
    }}
//    diabled={previousLocale === locale}
    className={classes.button}
    color="inherit"
    size="large"
    >
      {translate(`common.locales.${target}`)}
  </Button>
)


const enhance = compose(
  withStyles(styles),
  connect(
    (state) => ({previousLocale : state.app.locale}),
    {dialogHide, changeLocale}
  ),
  translate
);

export default enhance(LanguageButton);
