import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import { dialogShow } from './redux/actions';
import RegisterByRole from './RegisterByRole';

const RegisterButton = ({ classes, dialogShow }) => (
  <Button
    onClick={() => dialogShow({ title: 'asd', content: <RegisterByRole /> })}
  >
    REGISTER{' '}
  </Button>
);

const enhance = compose(
  connect(
    null,
    { dialogShow }
  ),
  withStyles()
);

export default enhance(RegisterButton);
