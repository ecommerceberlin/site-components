import React from 'react';
import Grid from '@material-ui/core/Grid';
import Ticket from './Ticket';

const Tickets = ({data, moreInfoLinkHref, ...gridProps}) => (
<Grid 
  container 
  {...gridProps}
  >
    {data.map((ticket, i) => (
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={ticket.id}>
          <Ticket data={ticket} moreInfoLinkHref={moreInfoLinkHref} />
        </Grid>
    ))}
  </Grid>
)

Tickets.defaultProps = {
  data : [],
  justify : "space-between",
  spacing : 24,
  moreInfoLinkHref: "/premium/[name]"
};

export default Tickets
