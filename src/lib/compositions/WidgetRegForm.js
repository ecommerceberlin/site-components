import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Wrapper } from '../components';
import { makeStyles } from '@material-ui/core/styles';
import { StepForm } from '../formik';
import { useSettings } from '../helpers'
import isString from 'lodash/isString'


const defaultProps = {
  wrapperProps: {
    label: "seting.wrapperProps.label",
    secondaryLabel: "setting.wrapperProps.secondaryLabel",
    dense: false,
    first: false
  },
  links: [],
  email_template : "",
  options: {},
  ticket_id : 0,
  role: "visitor",
  data : {},
  right: null,
  token: null,
};

const useStyles = makeStyles(theme => ({

  image : {
    width : "100%",
    transform: 'rotate(3deg)',
    filter: 'drop-shadow(30px 10px 5px #444)'
  }

}))

const WidgetRegForm = ({setting, ...props}) => {

    const classes = useStyles()
    const settings = useSettings(setting)
    const {post_api, service_api} = useSettings("system")

    const { 
      email_template, 
      options,
      ticket_id, 
      fields, 
      start, 
      data, 
      right, 
      baseLabel, 
      role,
      legend,
      token,
      actionFinishedProps,
      actionStartedProps,
      onSuccess,
      onError,
      wrapperProps,
      api
    } = Object.assign({}, defaultProps, settings, props)

    const fieldsWithOptions = fields.map(field => "options" in field && options && field.options in options ? {...field, options: options[field.options]} : field)
    
      return (
        <Wrapper {...wrapperProps}>
          <Grid container spacing={3} justify="space-between">
            <Grid item xs={12} sm={12} md={right? 7: 12} lg={right? 7: 12} xl={right? 7: 12}>
              <StepForm
                baseLabel={ baseLabel }
                data={ data }
                ticketId={ ticket_id }
                fields={ fieldsWithOptions }
                start={ start }
                template={ email_template }
                api={ api || post_api }
                updateApi={ service_api }
                role={ role }
                legend={ legend }
                token={ token }
                actionFinishedProps={actionFinishedProps}
                actionStartedProps={actionStartedProps}
                onSuccess={onSuccess}
                onError={onError}
              />
            </Grid>
            {right && <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              {isString(right)? <img src={ right } className={classes.image}  /> : right}
            </Grid> }
          </Grid>
        </Wrapper>)
}


export default WidgetRegForm
