import React from 'react';
import Grid from '@material-ui/core/Grid';
import Ticket from './Ticket';

const Tickets = ({data, ...gridProps}) => (
<Grid 
  container 
  {...gridProps}
  >
    {data.map((ticket, i) => (
        <Grid item xs="6" sm="6" md="4" lg="3" key={ticket.id}><Ticket data={ticket} /></Grid>
    ))}
  </Grid>
)

Tickets.defaultProps = {
  data : [],
  justify : "space-between",
  spacing : 24
};

export default Tickets
