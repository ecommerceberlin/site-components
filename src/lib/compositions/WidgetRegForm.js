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
    dense,
    right, 
    baseLabel, 
    summary,
    role,
    legend,
    token,
    actionFinishedProps,
    actionStartedProps,
    onSuccess,
    onError,
    wrapperProps
  }) => (


  <Settings>{(get) => {
 
  const fieldsWithOptions = get(`${setting}.fields`, fields).map(field => "options" in field && options && field.options in options ? {...field, options: options[field.options]} : field)

  const _wrapperProps = {...wrapperProps, ...get(`${setting}.wrapperProps`, {})}
  const _right = get(`${setting}.right`, right)

  return (
    <Wrapper {..._wrapperProps}>
      <Grid container spacing={1} justify="space-between">
        <Grid item xs={12} sm={12} md={_right? 7: 12} lg={_right? 7: 12} xl={_right? 7: 12}>
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
            actionFinishedProps={actionFinishedProps}
            actionStartedProps={actionStartedProps}
            onSuccess={onSuccess}
            onError={onError}
          />
        </Grid>
        {_right && <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          {typeof _right === "string" ? <img src={ get(`${setting}.background`, right) } className={classes.lanyard} /> : _right}
        </Grid> }
      </Grid>
    </Wrapper>
  )

  }}</Settings>

);

WidgetRegForm.defaultProps = {
  wrapperProps: {
    secondaryLabel: null,
  },
  links: [],
  dense: false,
  email_template : "",
  options: {},
  ticket_id : 0,
  role: "visitor",
  data : {},
  right: null,
  token: null,
};

export default withStyles(styles)(WidgetRegForm);
