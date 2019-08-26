import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Wrapper  from '../components/Wrapper';
import StepForm from '../formik/StepForm';

const styles = theme => ({

  lanyard : {
    width : "100%"
  }

})

const WidgetSpeaking = ({ classes, ...rest }) => (


  <Wrapper {...rest}>


  <Grid container spacing={8} justify="space-between">
    <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>

      <StepForm
        data={{}}
        ticketId={1631}
        baseLabel="presenters"
        fields={{
          email: 1,
          fname: 1,
          lname: 1,
          cname2: 1,
          phone: 1,
          presenter : 1,
          presentation_title : 1,
          presentation_description : 1
        }}
        start={[
          'presenter',
          'presentation_title', 
          'presentation_description',
          'cname2'
        ]}
        template="ebe-presenters-application"
        cc="speaking@ecommerceberlin.com"
        api='https://api.eventjuicer.com/v1/public/hosts/ecommerceberlin.com/register'
      />

    </Grid>


    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>

      {/* <img src="/static/lanyard.jpg" className={classes.lanyard} /> */}

    </Grid>
  </Grid>


  </Wrapper>

);

WidgetSpeaking.defaultProps = {
  links: [],
  label : "presenters.form.title"
};

export default withStyles(styles)(WidgetSpeaking);
