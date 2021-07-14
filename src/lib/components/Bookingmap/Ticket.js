import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import _get from 'lodash/get';
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import green from '@material-ui/core/colors/green';
import { useTranslate } from '../../i18n';
import TicketRemainingInfo from './TicketRemainingInfo'
import TicketDate from './TicketDate'
import TicketPrice from './TicketPrice'
import TicketBuyButtonNew from './TicketBuyButtonNew'
import { getCart } from '../../redux/selectors'
import { useSettings } from '../../helpers'
import { cartItemAdd, cartItemRemove } from '../redux/actions';
import TicketName from './TicketName'

const useStyles = makeStyles(theme => ({
  ticket : {
    padding: 10,
    fontFamily : "'Lato','Helvetica','Arial', sans-serif",
//    border : '1px solid #cccccc',
    margin : 2,
    minHeight : 50,
    borderRadius : 3
  },
  bookable : {
    backgroundColor : green[100],
  },
  nonbookable : {
    color : '#666666'
  }
}));

const defaultProps = {
  disabled : false
};

const Ticket = ({setting, ticket, boothId, label, ...props}) => {

  const classes = useStyles();
  // const cart = useSelector(getCart)

  const [translate, locale] = useTranslate()
  const settings = useSettings(setting)
  const {disabled} = Object.assign({}, defaultProps, settings, props)

  if(!ticket){
    return null
  }

  return (

    <div className={classNames(
      classes.ticket,
      ticket.bookable ? classes.bookable : classes.nonbookable
      )}>

    {/* {ticket.translation_asset_id ? <Box mb={1}><strong>{translate(ticket.translation_asset_id)}</strong></Box>: null}   */}

    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={12} md={6}>
        <Box mb={1}>
          <strong><TicketName names={ticket.names} group_id={ticket.group_id} baseLabel={ticket.translation_asset_id} /></strong>
        </Box>
        <Box mb={1}>
          <TicketDate start={ticket.start} end={ticket.end} inDates={ticket.in_dates} />
        </Box>
        <Box mb={1}>
          <TicketRemainingInfo isBookable={ticket.bookable} remaining={ticket.remaining} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <TicketPrice price={ticket.price} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TicketBuyButtonNew formdata={{ti: label, id: boothId}} id={ticket.id} bookable={ticket.bookable && !disabled } />
      </Grid>
    </Grid>
  </div>);
}

export default Ticket


//JSON.stringify({ti : booth_id, id : ref.data("id") })