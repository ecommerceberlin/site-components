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

const WidgetSpeaking = ({ categories, classes, ticketId, right, ...rest }) => (


  <Wrapper {...rest}>


  <Grid container spacing={1} justify="space-between">
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

      <StepForm
        data={{}}
        ticketId={ticketId}
        baseLabel="presenters"
        fields={[
          {name: "email", required: true},
          {name: "fname", required: true},
          {name: "lname", required: true},
          {name: "cname2", required: true},
          {name: "phone", required: true},
          {name: "presenter", required: true},  
          {
            name: "presentation_category", 
            required: true,
            options : categories
          },
          {name: "presentation_title", required: true},
          {name: "presentation_description", required: true}
        ]}
        start={[
          'presenter',
          'presentation_title', 
          'presentation_description',
          'presentation_category',
          'cname2'
        ]}
        template="ebe-presenters-application"
        cc="speaking@ecommerceberlin.com"
        api={`https://api.eventjuicer.com/v1/public/hosts/${process.env.NEXT_PUBLIC_PROJECT}/register`}
      />

    </Grid>


    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

      {/* <img src="/public/lanyard.jpg" className={classes.lanyard} /> */}

      {right}

    </Grid>
  </Grid>


  </Wrapper>

);

WidgetSpeaking.defaultProps = {
  ticketId : 1842,
  links: [],
  categories : [],
  label : "presenters.form.title",
  right: <div></div>
};

export default withStyles(styles)(WidgetSpeaking);
