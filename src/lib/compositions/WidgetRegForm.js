import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Wrapper } from '../components';
import { makeStyles } from '@material-ui/core/styles';
import { StepForm } from '../formik';
import { useSettings } from '../helpers'
import isString from 'lodash/isString'
import isEmpty from 'lodash/isEmpty'
import {Centered} from '../components/MyLayouts'
import {useTranslate} from '../i18n'
import {useSelector} from 'react-redux'
import {getCart} from '../redux/selectors'

const defaultProps = {
  wrapperProps: {
    label: null,
    secondaryLabel: null,
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
  fields: [
    {name: "email", required: true},
  ],
  start: ['email'],
  rightShadowed: false,
};

const useStyles = makeStyles(theme => ({

  image : {
    width : "100%",
  },

  rightShadowed: {
    width : "100%",
    transform: 'rotate(3deg)',
    filter: 'drop-shadow(30px 10px 5px #444)'
  }

}))

const WidgetRegForm = ({setting, ...props}) => {

    const classes = useStyles()
    const settings = useSettings(setting)
    const {post_api, service_api} = useSettings("system")
    const [translate, locale] = useTranslate()
    const cart = useSelector(getCart)
    const uuid = useSelector(state => state.app.uuid)

    const { 
      email_template, 
      options,
      ticket_id, 
      fields, 
      start, 
      data, 
      right, 
      rightShadowed, 
      role,
      token,
      wrapperProps,
      api,
      ...other
    } = Object.assign({}, defaultProps, settings, props)

    if(isEmpty(fields)){
      console.error("WidgetRegForm fields missing... Did you provide setting key?")
      return null
    }

    const fieldsWithOptions = fields.map(field => "options" in field && options && field.options in options ? {...field, options: options[field.options]} : field)
    
      return (
        <Wrapper {...wrapperProps}>
          <Grid container spacing={3} justify="space-between">
            <Grid item xs={12} sm={12} md={right? 7: 12} lg={right? 7: 12} xl={right? 7: 12}>
            <Centered>

               <StepForm
                data={ data }
                tickets={ cart }
                ticket_id={ ticket_id }
                fields={ fieldsWithOptions }
                start={ start }
                template={ email_template }
                api={ api || post_api }
                updateApi={ service_api }
                role={ role }
                token={ token }
                locale={ locale }
                uuid={ uuid }
                {...other}
              />

            </Centered>
             
            </Grid>
            {right && <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              {isString(right)? <img src={ right } className={rightShadowed? classes.rightShadowed: classes.image}  /> : right}
            </Grid> }
          </Grid>
        </Wrapper>)
}


export default WidgetRegForm
