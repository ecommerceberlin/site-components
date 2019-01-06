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

 <Settings name="visitor">{
  
({ticket_id, email_template, api, background}) => (

  <Grid container spacing={8} justify="space-between">
    <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>

     
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


     
    
     
    </Grid>

  

    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>

      <img src={background} className={classes.lanyard} />

    </Grid>
  </Grid>

  )}</Settings>

  </Wrapper>

);

WidgetVisitor.defaultProps = {
  links: [],
  label : "visitors.register"
};

export default withStyles(styles)(WidgetVisitor);
