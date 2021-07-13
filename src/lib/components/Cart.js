import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch, useSelector} from 'react-redux'
import { useTranslate } from '../i18n'
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import {cartItemRemove, resourceFetchRequest, dialogHide} from './redux/actions';
import { getCart, getTickets } from '../redux/selectors'
import MyButton from './MyButton'
import Paper from '@material-ui/core/Paper'
import TicketPrice from './Bookingmap/TicketPrice'
import TicketName from './Bookingmap/TicketName'
import TicketVariant from './Bookingmap/TicketVariant'
import TicketTotal from './Bookingmap/TicketTotal'

const useStyles = makeStyles(theme => ({

  root: {
    padding: 20
  },

  removeButton: {
    textDecoration: "underline",
    cursor: 'pointer'
  }
}))

const defaultProps = {

  purchaseButtonProps: {
    variant : "contained",
    label : "common.buy",
    color : "primary",
  },
 
  disabled: false

}

const Cart = ({setting, ...props}) => {

  const cart = useSelector(getCart)
  const tickets = useSelector(getTickets)
  const classes = useStyles()
  const dispatch = useDispatch();
  const [translate] = useTranslate();
  const {purchaseButtonProps, disabled} = Object.assign({}, defaultProps, props)

  useEffect(() => {

    if(isEmpty(tickets)){
      dispatch(resourceFetchRequest("tickets", true))
    }

  })

  const removeAction = (ticket_id) => {
    dispatch(cartItemRemove(ticket_id))
  }

  if(isEmpty(cart) || !isObject(cart)){
    return null
  }



  return (<Paper className={classes.root}>{Object.keys(cart).map(ticket_id => {

    const {quantity, formdata} = cart[ticket_id]
    const ticket = tickets && ticket_id in tickets? tickets[ticket_id]: {}

    return (<div key={ticket_id}><Grid container spacing={1}>
      <Grid item><TicketName names={ticket.names} label={ticket.translation_asset_id} /></Grid>
      <Grid item><TicketVariant {...formdata} /></Grid>
      {quantity>1 && <Grid item>{quantity}{` `}{translate("common.pcs")}</Grid>}
      <Grid item><TicketPrice price={ticket.price} /></Grid>
      {!disabled && <Grid item><span className={classes.removeButton} onClick={() => removeAction(ticket_id)}>{translate("ecommerce.cart.item_remove")}</span></Grid>}
      </Grid>
      <TicketTotal />
      </div>)

  })}
    {!disabled && <MyButton onClick={()=>dispatch(dialogHide())} href="/transaction" {...purchaseButtonProps} />}
    {/* <WidgetRegForm setting="exhibitor_registration" /> */}
  </Paper>)

}

export default Cart


/**
 * 

  agg: {customers: 0, sold: 0}
  bookable: 1
  details_url: ""
  end: "2021-07-13 23:59:00"
  errors: []
  group_id: 314
  id: 1731
  image: ""
  in_dates: 1
  limit: 1
  max_quantity: 1
  names: {pl: "Przestrzeń 6x4 / Strefa GRAND / V pula", en: "Exhibition Space 6x4 / GRAND / 5th pool", de: ""}
  price: {pl: 16599, en: 4149, de: 4149}
  remaining: 1
  role: "exhibitor"
  start: "2021-06-06 00:00:00"
  thumbnail: ""
  translation_asset_id: ""

*/