
import React from 'react';
import Wrapper from '../components/Wrapper'
import Tickets from '../components/Tickets'
import DatasourceTickets from '../datasources/Tickets';
import Settings from '../datasources/Settings';

const WidgetTickets = ({filter, moreInfoLinkHref, ...wrapperProps}) => (

    <Wrapper {...wrapperProps}>
    <Settings>{(get) => (
        <DatasourceTickets>{
            (tickets) => (<Tickets data={(tickets || []).filter(filter)} moreInfoLinkHref={moreInfoLinkHref} />)
        }</DatasourceTickets>)
    }</Settings>
    </Wrapper> 

)

WidgetTickets.defaultProps = {
    label : "tickets.title",
    filter : function(){ return true; },
    moreInfoLinkHref: "/premium/[name]"
}


export default WidgetTickets