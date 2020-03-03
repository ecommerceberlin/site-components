import React from 'react';
import { connect } from 'react-redux';
import { getTicketsSortedByStart } from '../../redux/selectors'
import Ticket from './Ticket';

const TicketGroup = ({disabled, disabledTicketIds, tickets, groupId, ...rest}) => {

  return tickets.filter(ticket => disabledTicketIds.indexOf(ticket.id)===-1).map(ticket => (
    <Ticket key={ticket.id} ticket={ticket} disabled={disabled} {...rest} />
  ))
}

TicketGroup.defaultProps = {
  tickets : [],
  label : "",
  boothId : "",
  noBookableTickets: null,
  disabled : false,
  disabledTicketIds : []
};


export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        tickets : getTicketsSortedByStart(state, props),
      }
    }
    return mapStateToProps}
)(TicketGroup);
