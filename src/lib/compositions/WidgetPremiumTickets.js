import React from 'react'
import {useSettings, useDatasource} from '../helpers'
import Wrapper from '../components/Wrapper'
import Grid from '@material-ui/core/Grid';
import Ticket from '../components/Ticket';
import TicketImage from '../components/TicketImage';

const defaultWrapperProps = {
    first: true,
    label: "resources.upgrades.premium.title",
}

const defaultGridProps = {
    xs: 12,
    sm: 6,
    md: 6,
    lg: 4,
    xl: 3 
}

const WidgetPremiumTickets = ({icons = {}, setting = "premium"}) => {

    const {ticketgroups, wrapperProps, gridProps} = useSettings(setting);
    const alltickets = useDatasource({
        resource: "tickets",
        params: {},
        filters: {
            filter: (t) => (ticketgroups || []).includes(t.group_id)
        }
    });

    const _wrapperProps = Object.assign({}, defaultWrapperProps, wrapperProps)
    const _gridProps = Object.assign({}, defaultGridProps, gridProps)

    return (<Wrapper {..._wrapperProps}><Grid container spacing={3}>{
        alltickets.map(ticket => (<Grid key={ticket.id} item {..._gridProps}>
        <Ticket data={ticket} icon={<TicketImage data={ticket} path="thumbnail" icons={icons} />} setting={setting} />
        </Grid>))
    }</Grid></Wrapper>)
}


export default WidgetPremiumTickets



