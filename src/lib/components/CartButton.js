import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Cart from './Cart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useTranslate } from '../i18n'
import { dialogShow, dialogHide, cartReset } from './redux/actions';

const CartButton = ({ count=0, label="common.cart" }) => {

  const [translate] = useTranslate();
  const dispatch = useDispatch()

  const clearCart = () => {
    dispatch(cartReset());
    dispatch(dialogHide());
  }

  const dialog = {
    title: label,
    content: <Cart />,
    buttons: [{
      label: translate("common.cart_purge"),
      action: function() { if(confirm(translate("common.cart_purge"))){ clearCart() }}
    }]
  }

  return (
    <Badge color="error" badgeContent={count}>
    <Button
    variant="text"
    onClick={() =>dispatch(dialogShow(dialog))}
    color="inherit"
    >
    <ShoppingCartIcon /> { translate(label) }
    </Button>
    </Badge>
  );
}

export default CartButton
