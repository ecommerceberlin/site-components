import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTicketsSortedByStart, getTicketsSortedByEnd, getTicketsSortedByPrice } from '../../redux/selectors'
import Ticket from './Ticket';
import { useSettings } from '../../helpers'
// import fetch from 'isomorphic-unfetch'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import head from 'lodash/head'
import isEmpty from 'lodash/isEmpty'

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
  const {ecommerce, disabledTicketIds} = Object.assign(defaultProps, settings, props)
  const ecommerceSettings = useSettings(ecommerce, {});
  const {sort} = Object.assign({}, ecommerceDefaultProps, ecommerceSettings)
  const tickets = useSelector((state) =>getTicketsSortedByPrice(state, {groupId}) )

  if(isEmpty(tickets) || !Array.isArray(tickets)){
    return null
  }

  const notDisabled = tickets.filter(ticket => disabledTicketIds.indexOf(ticket.id)===-1)
  //find cheapest option?

  const allBookable = notDisabled.filter(ticket => ticket.bookable)
  const paidTickets = allBookable.filter(ticket => Object.values(ticket.price).some(price => parseInt(price)))

  const cheapest = head(sortBy(allBookable, function(item){
    //TODO: use baseprice :)
    return !isNaN(get(item, "price.pl", ""))? parseInt(get(item, "price.pl", 0)): parseInt(get(item, "price.en", 0))   
  }))

  return notDisabled.map(ticket => (<Ticket total={allBookable.length} paid={paidTickets.length} cheapest={cheapest && cheapest.id == ticket.id} key={ticket.id} setting={setting} ticket={ticket} boothId={boothId} label={label} />))
}

export default TicketGroup

