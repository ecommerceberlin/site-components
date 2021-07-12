import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTicketsSortedByStart } from '../../redux/selectors'
import Ticket from './Ticket';
import { useSettings } from '../../helpers'
import fetch from 'isomorphic-unfetch'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

const defaultProps = {
  tickets : [],
  label : "",
  boothId : "",
  noBookableTickets: <div/>,
  disabled : false,
  disabledTicketIds : [],
  refreshInterval: 5 * 1000
};


const TicketGroup = ({setting, groupId, boothId, label, status, ...props}) => {

  const tickets = useSelector((state) => getTicketsSortedByStart(state, {groupId}))
  const settings = useSettings(setting, {});
  const {api} = useSettings("system", {});
  const  {disabled, disabledTicketIds, refreshInterval} = Object.assign(defaultProps, settings, props)
  
  const { data, error } = useSWR(`${api}/blockings`, fetcher, { 
      refreshInterval,
      refreshWhenHidden: false 
  })

  return tickets.filter(ticket => disabledTicketIds.indexOf(ticket.id)===-1).map(ticket => (
    <Ticket key={ticket.id} setting={setting} ticket={ticket} boothId={boothId} label={label} />
  ))
}

export default TicketGroup

