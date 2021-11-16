import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTicketsSortedByStart, getTicketsSortedByEnd } from '../../redux/selectors'
import Ticket from './Ticket';
import { useSettings } from '../../helpers'
import fetch from 'isomorphic-unfetch'


const defaultProps = {
  tickets : [],
  label : "",
  boothId : "",
  noBookableTickets: <div/>,
  disabled : false,
  disabledTicketIds : [],
  refreshInterval: 5 * 1000
};

const ecommerceDefaultProps = {
  sort: "start"
}

const TicketGroup = ({setting, groupId, boothId, label, status, ...props}) => {

  const settings = useSettings(setting, {});
  const  {ecommerce, disabled, disabledTicketIds, refreshInterval} = Object.assign(defaultProps, settings, props)
  const ecommerceSettings = useSettings(ecommerce, {});
  const {sort} = Object.assign({}, ecommerceDefaultProps, ecommerceSettings)
  const tickets = useSelector((state) => sort && sort == "end" ? getTicketsSortedByEnd(state, {groupId}): getTicketsSortedByStart(state, {groupId}) )

  return tickets.filter(ticket => disabledTicketIds.indexOf(ticket.id)===-1).map(ticket => (
    <Ticket key={ticket.id} setting={setting} ticket={ticket} boothId={boothId} label={label} />
  ))
}

export default TicketGroup

