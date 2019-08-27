
import React from 'react';

import TextInput from './TextInput';
import SelectInput from './SelectInput';

import FormButton from './FormButton';
import withFormik, { filterFields, startFields } from './formik';

import { MyTypography as Typography } from '../components';
import { translate } from '../i18n';
import FormSuccess from './FormSuccess';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { formActionStarted, formActionFinished } from './redux'


/*
dirty : false
errors : {}
handleBlur : ƒ (e)
handleChange : ƒ (e)
handleReset : ƒ ()
handleSubmit : ƒ (e)
initialValues : {}
isSubmitting : true
isValid : false
locale : "pl"
resetForm : ƒ (nextValues)
setError : ƒ (error)
setErrors : ƒ (errors)
setFieldError : ƒ (field, message)
setFieldTouched : ƒ (field, touched, shouldValidate)
setFieldValue : ƒ (field, value, shouldValidate)
setFormikState : ƒ (s, callback)
setStatus : ƒ (status)
setSubmitting : ƒ (isSubmitting)
setTouched : ƒ (touched)
setValues : ƒ (values)
submitForm : ƒ ()
touched : {}
translate : ƒ ()
user : {}
validateForm : ƒ (values)
validateOnBlur : true
validateOnChange : true
values : {}
*/

const StepForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    status,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
    success,
    fields,
    start,
    baseLabel,
    formActionStarted,
    formActionFinished
  
  } = props;

  const started = Object.keys(touched).length;


  if (started) {

    formActionStarted({
      action : "registration_start", 
      category : "visitors", 
      label : "method",
      value : ""
    });
  
  }

  if (status && status === 'ok') {


    formActionFinished({
        action : "registration_success", 
        category : "visitors", 
        label : "method",
        value : ""
    });

    return <FormSuccess baseLabel={baseLabel} />;
  }

  const filteredFields = filterFields(fields, start);
  const startedFields = startFields(fields, start);

  return (
    <form onSubmit={handleSubmit}>

      <Typography template="legend" label={`${baseLabel}.form.intro`} />

      {start.length ? startedFields.map( (data, idx) => {

        if("options" in data && data.options.length){
          return (<SelectInput 
            key={idx}
            id={data.name}
            label={`${baseLabel}.fields.${data.name}`}
            options={data.options}
            {...props}
          />)
        }

        return (<TextInput
            key={idx}
            id={data.name}
            label={`${baseLabel}.fields.${data.name}`}
            {...props}
          />)
      }

      ) : null}

      {(started || !start) && filteredFields.length
        ? filteredFields.map( (data, idx) => {

          if("options" in data && data.options.length){
            return (<SelectInput 
              key={idx}
              id={data.name}
              label={`${baseLabel}.fields.${data.name}`}
              options={data.options}
              {...props}
            />)
          }

          return ( <TextInput
              key={idx}
              id={data.name}
              label={`${baseLabel}.fields.${data.name}`}
              {...props}
            /> )

        })
        : null}

      <FormButton label={`${baseLabel}.form.submit`} {...props} />
    </form>
  );
};

StepForm.defaultProps = {
  api: "https://api.eventjuicer.com/v1/public/hosts/ecommerceberlin.com/register",
  template : 'ecommerceberlin-visitor-registration',
  ticketId : 0,
  baseLabel : "visitors"
};

const enhance = compose(
  translate,
  connect(null, {formActionStarted, formActionFinished}),
  withFormik
)
export default enhance(StepForm);
