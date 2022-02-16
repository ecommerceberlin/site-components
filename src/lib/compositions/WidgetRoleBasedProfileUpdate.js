
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Wrapper, Loading } from '../components';
import { makeStyles } from '@material-ui/core/styles';
import Settings from '../datasources/Settings';
import { StepForm } from '../formik';
import { useUserData } from '../helpers'

const useStyles = makeStyles(theme => ({

  lanyard : {
    width : "100%"
  }

}));

const WidgetRoleBasedProfileUpdate = ({ 
    setting, 
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
    actionFinishedProps,
    actionStartedProps,
    onSuccess,
    onError,
    ...rest }) => {
    
    const classes = useStyles();
    const user = useUserData();

    if(!user){

        return (<Settings>{(get) => { 

            return (<Wrapper style={{paddingTop: 100, paddingBottom: "80vh"}}><Loading items={get(`${setting}.fields`, fields)} /></Wrapper>)}}</Settings>)

    }

    // let mergedFields = []
    // const roles = user.roles?.map(item => item)


    return (<Settings>{(get) => {
           
        const fieldsWithOptions = get(`${setting}.fields`, fields).map(field => "options" in field && options && field.options in options ? {...field, options: options[field.options]} : field)
          
        return (<Wrapper label={get(`${setting}.label`, label)} secondaryLabel={get(`${setting}.secondaryLabel`, secondaryLabel)} {...rest}  >
                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                    <StepForm
                      baseLabel={ get(`${setting}.baseLabel`, baseLabel) }
                      data={ user.fields }
                      fields={fieldsWithOptions}
                      start={get(`${setting}.start`, start)}
                      template={ get(`${setting}.email_template`, email_template) }
                      api={ get(`${setting}.api`, get("system.post_api") ) }
                      updateApi={ get("system.service_api") }
                      legend={ get(`${setting}.legend`, legend)  }
                      token={user.token}
                      actionFinishedProps={actionFinishedProps}
                      actionStartedProps={actionStartedProps}
                      onSuccess={onSuccess}
                      onError={onError}
                    />
                  </Grid>
                  {right && <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                 
                    {/* <MyTypography template="h5">{user.fields.cname2}</MyTypography>  
                    <MyTypography template="subtitle1">{user.fields.project_name}</MyTypography>   */}
                    {/* <Markdown label="awards.rules-summary.body" /> */}

                  </Grid> }       
                </Grid>
              </Wrapper>
            )
          
            }}</Settings>
          
        );
} 

WidgetRoleBasedProfileUpdate.defaultProps = {
  setting: "profile_editor",
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

export default WidgetRoleBasedProfileUpdate;
