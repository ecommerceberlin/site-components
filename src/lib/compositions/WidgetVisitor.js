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

const WidgetVisitor = ({ setting, classes, email_template, ticket_id, fields, start, data, label, secondaryLabel, background, ...rest }) => (


  
  <Settings>{(get) => {
 
  return (
    <Wrapper label={get(`${setting}.label`, label)} secondaryLabel={get(`${setting}.secondaryLabel`, secondaryLabel)} {...rest}  >
      <Grid container spacing={1} justify="space-between">
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>

          <StepForm
          data={ get(`${setting}.data`, data) }
          ticketId={ get(`${setting}.ticket_id`, ticket_id) }
          fields={get(`${setting}.fields`, fields)}
          start={get(`${setting}.start`, start)}
          template={ get(`${setting}.email_template`, email_template) }
          api={ get("visitor.api") }
          />

        </Grid>
    
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <img src={ get(`${setting}.background`, background) } className={classes.lanyard} />
        </Grid>

      </Grid>
    </Wrapper>
  )

  }}</Settings>

);

WidgetVisitor.defaultProps = {

  setting: "visitor.register",
  links: [],
  label : "visitors.register",
  secondaryLabel: null,
  email_template : null,
  ticket_id : 0,
  data : {},
  fields : [
    {name: "email", required: true},
    {name: "fname", required: true},
    {name: "lname", required: true},
    {name: "cname2", required: true},
    {name: "position", required: true},
    {name: "nip", required: false},
    {name: "phone", required: true}
  ],
  start : ['email', 'fname'],
  background: "/lanyard.jpg"
};

export default withStyles(styles)(WidgetVisitor);
