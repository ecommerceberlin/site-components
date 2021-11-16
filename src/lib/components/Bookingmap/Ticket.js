import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _get from 'lodash/get';
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import green from '@material-ui/core/colors/green';
import TicketRemainingInfo from './TicketRemainingInfo'
import TicketDate from './TicketDate'
import TicketPrice from './TicketPrice'
import TicketBuyButton from './TicketBuyButton'
import TicketBuyButtonNew from './TicketBuyButtonNew'
import { useSettings } from '../../helpers'
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

const ecommerceDefaultProps = {
  show_dates: true,
  use_old_ecommerce_module: false
}

const Ticket = ({setting, ticket, boothId, label, ...props}) => {

  const classes = useStyles();
  const settings = useSettings(setting, {})
  // const {use_old_ecommerce_module} = useSettings("system")
  const {ecommerce, disabled, use_old_ecommerce_module} = Object.assign({}, defaultProps, settings, props)

  const ecommerceSettings = useSettings(ecommerce, {});
  const {show_dates} = Object.assign({}, ecommerceDefaultProps, ecommerceSettings)

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
         {show_dates && <TicketDate start={ticket.start} end={ticket.end} inDates={ticket.in_dates} />}
        </Box>
        {/* <Box mb={1}>
         
        </Box> */}
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <TicketPrice price={ticket.price} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
       {use_old_ecommerce_module ? <TicketBuyButton formdata={{ti: label, id: boothId}} id={ticket.id} bookable={ticket.bookable && !disabled }  />: <TicketBuyButtonNew formdata={{ti: label, id: boothId}} id={ticket.id} bookable={ticket.bookable && !disabled } />} 
       <TicketRemainingInfo isBookable={ticket.bookable} remaining={ticket.remaining} />
      </Grid>
    </Grid>
  </div>);
}

export default Ticket


//JSON.stringify({ti : booth_id, id : ref.data("id") })