import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import _get from 'lodash/get';
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import green from '@material-ui/core/colors/green';

import { translate } from '../../i18n';
import TicketRemainingInfo from './TicketRemainingInfo'
import TicketDate from './TicketDate'
import TicketPrice from './TicketPrice'
import TicketBuyButton from './TicketBuyButton'

import {
  cartItemAdd as cartItemAddAction,
  cartItemRemove as cartItemRemoveAction
} from '../redux/actions';


const styles = {

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

}

//JSON.stringify({ti : booth_id, id : ref.data("id") })

class Ticket extends React.PureComponent {

  handleChange = name => (event, checked) => {
    // const { ticket, cartItemAdd, cartItemRemove, formdata } = this.props;

    // if (this.isSelected()) {
    //   cartItemRemove(ticket.id, formdata);
    // } else {
    //   cartItemAdd(ticket.id, 1, formdata);
    // }
  };

  isSelected() {
    const { cart, ticket } = this.props;
    return ticket && ticket.id in cart;
  }

  getTicketName() {
    const { ticket, locale } = this.props;

    return _get(ticket, `names.${locale}`);
  }

  getPostEndpointBasedOnLocale() {
    const {locale} = this.props
    return locale == "en" ? "https://ecommercewarsaw.com/preorder" : "https://stoiska.targiehandlu.pl/preorder";
  }

  render() {
    const { ticket, classes, boothId, label } = this.props;

    if (!ticket) {
      return null;
    }

    const formdata = {ti: label, id: boothId} 

    return (

      <div className={classNames(
        classes.ticket,
        ticket.bookable ? classes.bookable : classes.nonbookable
        )}>

      <Grid 
        container
        spacing={16}
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={3}>
          <TicketDate start={ticket.start} end={ticket.end} inDates={ticket.in_dates} />
        </Grid>
         
        <Grid item xs={12} sm={12} md={3}>
        {<TicketRemainingInfo isBookable={ticket.bookable} remaining={ticket.remaining} />}
        </Grid>

        <Grid item xs={12} sm={12} md={3}><TicketPrice price={ticket.price} /></Grid>

        <Grid item xs={12} sm={12} md={3}>

          {ticket.bookable ?
          <form action={this.getPostEndpointBasedOnLocale()} method="post" target="_blank">
          <input type="hidden" name={`tickets[${ticket.id}]`} value="1" />
          <input type="hidden" name={`ticketdata[${ticket.id}]`} value={JSON.stringify(formdata)} />
          <TicketBuyButton  />
          </form> : <span></span>}

        </Grid>
    </Grid>
    </div>

      //
      // <FormGroup>
      //   <FormLabel></FormLabel>
      //   <FormControlLabel
      //   control={
      //     <Checkbox
      //       disabled={!ticket.bookable}
      //       color="secondary"
      //       checked={this.isSelected()}
      //       onChange={this.handleChange('_')}
      //       value="gilad"
      //
      //     />
      //   }
      //   label={this.getTicketName()}
      // />
      // <FormHelperText>Be careful</FormHelperText>
      // </FormGroup>
    );
  }
}

Ticket.propTypes = {
  ticket: PropTypes.object.isRequired,
  boothId: PropTypes.string.isRequired,
  label : PropTypes.string.isRequired
};

Ticket.defaultProps = {};

const enhance = compose(
  translate,
  withStyles(styles),
  connect(
    state => ({
      cart: state.app.cart
    }),
    {
      cartItemAdd: cartItemAddAction,
      cartItemRemove: cartItemRemoveAction
    }
  )
);

export default enhance(Ticket);
