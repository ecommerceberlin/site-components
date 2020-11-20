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

const WidgetRegForm = ({ 
    setting, 
    classes, 
    email_template, 
    options,
    ticket_id, 
    fields, 
    start, 
    data, 
    label, 
    secondaryLabel, 
    right, 
    baseLabel, 
    summary,
    role,
    legend,
    token,
    ...rest }) => (


  <Settings>{(get) => {
 
  const fieldsWithOptions = get(`${setting}.fields`, fields).map(field => "options" in field && options && field.options in options ? {...field, options: options[field.options]} : field)

  return (
    <Wrapper label={get(`${setting}.label`, label)} secondaryLabel={get(`${setting}.secondaryLabel`, secondaryLabel)} {...rest}  >
      <Grid container spacing={1} justify="space-between">
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <StepForm
            baseLabel={ get(`${setting}.baseLabel`, baseLabel) }
            data={ get(`${setting}.data`, data) }
            ticketId={ get(`${setting}.ticket_id`, ticket_id) }
            fields={fieldsWithOptions}
            start={get(`${setting}.start`, start)}
            template={ get(`${setting}.email_template`, email_template) }
            api={ get(`${setting}.api`, get("system.post_api") ) }
            updateApi={ get("system.service_api") }
            role={ get(`${setting}.role`, role) }
            legend={ get(`${setting}.legend`, legend)  }
            token={token}
          />
        </Grid>
        {right && <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          {typeof right === "string" ? <img src={ get(`${setting}.background`, right) } className={classes.lanyard} /> : right}
        </Grid> }

      </Grid>
    </Wrapper>
  )

  }}</Settings>

);

WidgetRegForm.defaultProps = {
  links: [],
  secondaryLabel: null,
  email_template : "",
  options: {},
  ticket_id : 0,
  role: "visitor",
  data : {},
  right: null,
  token: null,
};

export default withStyles(styles)(WidgetRegForm);
