import React from 'react'
import Settings from '../datasources/Settings'
import WidgetTickets from './WidgetTickets'

const WidgetPremiumTickets = ({first, label, moreInfoLinkHref}) => (

    <Settings>{(get)=> ( <WidgetTickets
        first={first}
        label={label}
        filter={function(ticket) {
          return get("premium.ticketgroups", []).indexOf(ticket.group_id)!== -1
        }}
        moreInfoLinkHref={moreInfoLinkHref}
      />)
    
    }</Settings>

)

WidgetPremiumTickets.defaultProps = {
    first: true,
    label: "resources.upgrades.premium.title",
    moreInfoLinkHref: "/premium/[name]"
}

export default WidgetPremiumTickets


