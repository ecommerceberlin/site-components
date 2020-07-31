import React from 'react';
import Grid from '@material-ui/core/Grid';


import { EventInfo, Wrapper } from '../components';
import { withStyles } from '@material-ui/core/styles';
import Settings from '../datasources/Settings';

import { StepForm } from '../formik';


const styles = theme => ({

  lanyard : {
    width : "100%"
  }

})

const WidgetVisitor = ({ classes, template, ticket_id, fields, start, data, ...rest }) => (

  <Wrapper {...rest}>

 <Settings>{(get) => (

  <Grid container spacing={1} justify="space-between">
    <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>

        <StepForm
          data={data}
          ticketId={ticket_id || get("visitor.default_ticket_id") }
          fields={fields}
          start={start}
          template={template || get("visitor.default_email_template") }
          api={get("visitor.api") }
        />

    </Grid>

    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>

      <img src={ get("visitor.background") } className={classes.lanyard} />

    </Grid>
  </Grid>

  )}</Settings>

  </Wrapper>

);

WidgetVisitor.defaultProps = {
  links: [],
  label : "visitors.register",
  template : null,
  ticket_id : 0,
  data : {},
  fields : [
    {name: "email", required: true},
    {name: "fname", required: true},
    {name: "lname", required: true},
    {name: "cname2", required: true},
    {name: "position", required: true},
    {name: "phone", required: true}
  ],
  start : ['email', 'fname']
};

export default withStyles(styles)(WidgetVisitor);
