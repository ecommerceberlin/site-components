import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import Cart from './Cart';

import {
  dialogShow as dialogShowAction,
  cartReset as cartResetAction
} from './redux/actions';

const CartButton = ({ dialogShow, cartReset, count, label }) => (
  <Badge color="secondary" badgeContent={count}>
    <Button
      variant="raised"
      onClick={() =>
        dialogShow({
          title: label,
          content: <Cart />,
          buttons: [
            {
              label: 'test',
              action: function() {
                alert('asd');
              }
            },
            {
              label: 'Wyczyść koszyk',
              action: function() {
                cartReset();
              }
            }
          ]
        })
      }
      color="inherit"
    >
      {label}
    </Button>
  </Badge>
);

CartButton.defaultProps = {
  count: 0,
  label: 'Koszyk'
};

const enhance = compose(
  connect(
    null,
    {
      dialogShow: dialogShowAction,
      cartReset: cartResetAction
    }
  )
);

export default enhance(CartButton);
