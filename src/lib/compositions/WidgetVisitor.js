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

const WidgetVisitor = ({ classes, ...rest }) => (


  <Wrapper {...rest}>


  <Grid container spacing={8} justify="space-between">
    <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>

      <Settings name="visitor">

      {
        
        ({ticket_id, email_template, api, background}) => (

        <StepForm
          data={{}}
          ticketId={ticket_id}
          fields={{
            email: 1,
            fname: 1,
            lname: 1,
            cname2: 1,
            position: 1,
            phone: 1
          }}
          start={['email', 'fname']}
          template={email_template}
          api={api}
        />


      )}
      </Settings>
     
    </Grid>

    {/* <Grid item xs={10} sm={6} md={5} lg={3} xl={3}>
      <EventInfo
        items={[
          {
            icon: 'location',
            label: 'event.location',
            text: 'EXPO Kraków, Kraków'
          },

          {
            icon: 'date',
            label: 'event.date',
            text: '17 kwietnia 2019'
          },

          {
            icon: 'alarm',
            label: 'event.hours',
            text: '10:00-17:00'
          }
        ]}
        orientation="v"
      />
    </Grid> */}

    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>

      <img src="/static/lanyard.jpg" className={classes.lanyard} />

    </Grid>
  </Grid>


  </Wrapper>

);

WidgetVisitor.defaultProps = {
  links: [],
  label : "visitors.register"
};

export default withStyles(styles)(WidgetVisitor);
