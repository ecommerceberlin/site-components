
import React from 'react';

import TextInput from './TextInput';
import SelectInput from './SelectInput';

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
    
    const {status, formActionStarted, formActionFinished, actionStartedProps, actionFinishedProps} = this.props;

    if( this.isStarted() ) {
      formActionStarted(actionStartedProps);
    }

    if(status && "data" in status) {
      formActionFinished(actionFinishedProps);    

      if('token' in status.data){
        addToken(status.data.token);
      }
    }

 //  console.log("updated")
  }

  renderResetButton(label = "reset"){

    const {handleReset} = this.props;

    return <div><MyButton variant="outlined" color="primary" size="medium" onClick={handleReset} label={label} /></div>
  
  }

  render(){

    const {
      // values,
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
      if( "data" in status){
          return <div>{onSuccess(this.props)}{this.renderResetButton("reset")}</div>;
      }
      if( "error" in status){
          return <div>{onError(this.props)}{this.renderResetButton("reset")}</div>;
      }
    }

    return (
      
      <form onSubmit={handleSubmit}>

      <Typography template="legend" label={(legend || `${baseLabel}.form.intro`)} />

      {showStartFields ? startedFields.map( (data, idx) => {

        if("options" in data && data.options.length){
          return (<SelectInput 
            key={idx}
            id={data.name}
            label={`${baseLabel}.fields.${data.name}`}
            options={data.options}
            {...this.props}
          />)
        }

        return (<TextInput
            key={idx}
            id={data.name}
            label={`${baseLabel}.fields.${data.name}`}
            {...this.props}
          />)
      }

      ) : null}

      {(this.isStarted() || !showStartFields) && filteredFields.length
        ? filteredFields.map( (data, idx) => {

          if("options" in data && data.options.length){
            return (<SelectInput 
              key={idx}
              id={data.name}
              label={`${baseLabel}.fields.${data.name}`}
              options={data.options}
              {...this.props}
            />)
          }

          return ( <TextInput
              key={idx}
              id={data.name}
              label={`${baseLabel}.fields.${data.name}`}
              {...this.props}
            /> )

        })
        : null}

      <FormButton label={`${baseLabel}.form.submit`} {...this.props} />
    </form>
    )
  }
}


StepForm.defaultProps = {
  api: "https://api.eventjuicer.com/v1/public/hosts/...",
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
  legend: null
};

const enhance = compose(
  translate,
  withRouter,
  connect(null, {formActionStarted, formActionFinished}),
  withFormik
)
export default enhance(StepForm);
