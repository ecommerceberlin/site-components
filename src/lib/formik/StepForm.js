
import React from 'react';

import TextInput from './TextInput';
import SelectInput from './SelectInput';
import CheckBoxInput from './CheckBoxInput';
// import FileInput from './FileInput'

import FormButton from './FormButton';
import withFormik, { filterFields, startFields } from './formik';
import { withRouter } from 'next/router';
import { MyTypography as Typography } from '../components';
import { translate } from '../i18n';
import FormSuccess from './FormSuccess';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { formActionStarted, formActionFinished } from './redux'
import { addToken } from '../helpers';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyButton from '../components/MyButton'
// import shallowEqual from 'recompose/shallowEqual'
import isFunction from 'lodash/isFunction'

class StepForm extends React.Component {

  componentDidMount(){

    const {start, router, setValues, setTouched, values} = this.props;

    const {query} = router;

    const prefilled = Object.keys(query);
    
    if(prefilled.length){

      setValues({...values, ...query})

      let difference = prefilled.filter(x => !(start || []).includes(x));
  
      if(difference.length || prefilled.length > 1){
        setTouched(query);
      }

    }

  }

  isStarted(){
    const {touched} = this.props;
    return Object.keys(touched).length;
  }

  componentDidUpdate(){
    
    const {data, values, status, formActionStarted, formActionFinished, actionStartedProps, actionFinishedProps} = this.props;

    if( this.isStarted() ) {
     // formActionStarted(actionStartedProps);
    }

    if(status && "data" in status) {
    
      //  formActionFinished(actionFinishedProps);   

      if('token' in status.data){
        addToken(status.data.token);
      }
    }

 //  console.log("updated")
  }

  renderResetButton(label = "reset"){

    const {setStatus, formActionFinished, actionFinishedProps} = this.props;

    return <div><MyButton variant="outlined" color="primary" size="medium" onClick={e => { formActionFinished(actionFinishedProps);  setStatus(null); }} label={label} /></div>
  
  }

  renderField(data, idx){

    const {baseLabel, errors, values, handleChange, handleBlur, setFieldValue, setFieldTouched, validateField} = this.props;
    const id = data.name;
    const required = "required" in data && data.required === true;
    const error = id in errors ? errors[id] : false;
    const value= id in values ? values[id] : "";
    const label = `${baseLabel}.fields.${id}`
    const multiline =  "long" in data && data.long || id.indexOf("description") > -1

    const passedProps = {id, label, required, error, value, handleChange, handleBlur, setFieldValue, setFieldTouched, validateField};

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


  render(){

    const {
      values,
      // touched,
      // errors,
      // dirty,
      // isValid,
      // handleChange,
      // handleBlur,
      status,
      handleSubmit,
      isSubmitting,
      fields,
      start,
      baseLabel,
      onSuccess,
      onError,
      legend
    } = this.props;

    const filteredFields = filterFields(fields, start);
    const startedFields = startFields(fields, start);
    const showStartFields = start && Array.isArray(start) && start.length;

    if(isSubmitting){
      return <CircularProgress />
    }

    if (status){
      if( "data" in status && isFunction(onSuccess)){
          return <div>{onSuccess({baseLabel, values})}{this.renderResetButton("reset")}</div>;
      }
      if( "error" in status && isFunction(onError)){
          return <div>{onError({baseLabel, values})}{this.renderResetButton("reset")}</div>;
      }
    }

    return (
      
      <form onSubmit={handleSubmit}>
      <Typography template="legend" label={(legend || `${baseLabel}.form.intro`)} />
      {showStartFields ? startedFields.map( (data, idx) => this.renderField(data, idx)) : null}
      {(this.isStarted() || !showStartFields) && filteredFields.length ? filteredFields.map( (data, idx) =>  this.renderField(data, idx)) : null}
      <FormButton label={`${baseLabel}.form.submit`} {...this.props} />
    </form>
    )
  }
}


StepForm.defaultProps = {
  template : 'sparkpost-remplate',
  ticketId : 0,
  baseLabel : "visitors",
  onSuccess: (props) => <FormSuccess baseLabel={props.baseLabel} />,
  onError: (props) => <div>error</div>,
  actionStartedProps: {
    action : "registration_start", 
    category : "visitors", 
    label : "method",
    value : ""
  },
  actionFinishedProps: {
    action : "registration_success", 
    category : "visitors", 
    label : "method",
    value : ""
  },
  start: null,
  legend: null,
  token: null
};

const enhance = compose(
  translate,
  withRouter,
  connect(null, {formActionStarted, formActionFinished}),
  withFormik
)
export default enhance(StepForm);
