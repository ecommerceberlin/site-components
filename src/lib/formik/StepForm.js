
import React, {useState, useEffect} from 'react';

import TextInput from './TextInput';
import SelectInput from './SelectInput';
import CheckBoxInput from './CheckBoxInput';
// import FileInput from './FileInput'

import FormButton from './FormButton';
import withFormik, { filterFields, startFields } from './formik';
import { useRouter } from 'next/router';
import { MyTypography as Typography } from '../components';
import { useTranslate } from '../i18n';
import FormSuccess from './FormSuccess';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { formActionStarted, formActionFinished } from './redux'
import { addToken, fullUrl, getUrlParams } from '../helpers';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyButton from '../components/MyButton'
// import shallowEqual from 'recompose/shallowEqual'
import isFunction from 'lodash/isFunction'
import {useDispatch} from 'react-redux'
import { cartReset } from '../components/redux'
import isEmpty from 'lodash/isEmpty'

const defaultProps = {
  template : 'sparkpost-remplate',
  ticketId : 0,
  baseLabel : "visitors",
  onSuccess: (props) => <FormSuccess baseLabel={props.baseLabel} />,
  onError: (props) => <div>error</div>,
  actionStartedProps: {
    event : "free_signup", 
    status : "started", 
  },
  actionFinishedProps: {
    event : "free_signup", 
    status : "success"
  },
  start: null,
  legend: null,
  token: null
};


const StepForm = ({setting, handleChange, handleBlur, handleSubmit, isSubmitting, isValid, validateField, setFieldValue, setValues, setFieldTouched, setTouched, setStatus, touched, values, errors, status, ...props}) => {

  const [actionStartedNotified, setActionStartedNotified] = useState(false)
  const dispatch = useDispatch()
  const {asPath} = useRouter()
  const [translate, locale] = useTranslate()

  const {baseLabel, data, start, fields, tickets, actionStartedProps, actionFinishedProps, onSuccess, onError, legend} = Object.assign({}, defaultProps, props)

  useEffect(() => {
    const url = fullUrl(asPath)
    const params = getUrlParams(asPath)
    const prefilled = Object.keys(params);
    setValues({...values, ...params, url, locale})
    let difference = prefilled.filter(x => !(start || []).includes(x));
    if(difference.length || prefilled.length){
      setTouched(params);
    }
  }, [])

  useEffect(() => {

    if( !actionStartedNotified && isStarted() ) {
      setActionStartedNotified(true)
      dispatch(formActionStarted(actionStartedProps))
    }

    if(status && "data" in status) {
      dispatch(formActionFinished(actionFinishedProps))   
      if('token' in status.data){
        addToken(status.data.token);
      }
      if(!isEmpty(tickets)){
        dispatch(cartReset())
      }
    }
  })

  const filteredFields = filterFields(fields, start);
  const startedFields = startFields(fields, start);
  const showStartFields = start && Array.isArray(start) && start.length;
  const isStarted = () => Object.keys(touched).length

  const renderResetButton = (label = "reset") => {
    return <div><MyButton variant="outlined" color="primary" size="medium" onClick={() => { dispatch(formActionFinished(actionFinishedProps));  setStatus(null); }} label={label} /></div>
  }

  const renderField = (data, idx) => {

    const id = data.name;
    const required = "required" in data && data.required === true;
    const error = id in errors ? errors[id] : false;
    const value= id in values ? values[id] : "";
    const label = `${baseLabel}.fields.${id}`
    const multiline =  "long" in data && data.long || id.indexOf("description") > -1
    const more = "more" in data && data.more? data.more: ""
    const passedProps = {id, label, required, more, error, value, handleChange, handleBlur, setFieldValue, setFieldTouched, validateField};

    if("options" in data && Array.isArray(data.options) && data.options.length){
      return (<SelectInput key={id} options={data.options} {...passedProps} />)
    }

    if("type" in data){
      if(data.type === "confirm"){
        return  (<CheckBoxInput key={id} {...passedProps} />)
      }
      if(data.type === "file"){
        // return  (<FileInput key={id} {...passedProps} />)
      }
    }

    return (<TextInput key={idx} multiline={multiline} {...passedProps} />)

  }

  if(isSubmitting){
    return <CircularProgress />
  }

  if (status){
    if( "data" in status && isFunction(onSuccess)){
        return <div>{onSuccess({baseLabel, values})}{renderResetButton("reset")}</div>;
    }
    if( "error" in status && isFunction(onError)){
        return <div>{onError({baseLabel, values})}{renderResetButton("reset")}</div>;
    }
  }

  return (
      
    <form onSubmit={handleSubmit} style={{maxWidth: 700, width: "100%"}}>
    <Typography template="legend" label={(legend || `${baseLabel}.form.intro`)} />
    {showStartFields ? startedFields.map( (data, idx) => renderField(data, idx)) : null}
    {(isStarted() || !showStartFields) && filteredFields.length ? filteredFields.map( (data, idx) =>  renderField(data, idx)) : null}
    <FormButton label={`${baseLabel}.form.submit`} errors={errors} isValid={isValid} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
  </form>
  )

}

export default withFormik(StepForm);


