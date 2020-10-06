
import compose from 'recompose/compose';

import {
    TextInput, 
    FormButton, 
    FormSuccess, 
    withFormik,
    //filterFields
} from '../../formik';

import Typography from '../MyTypography';
import {translate} from '../../i18n';
import {dialogShow} from '../redux'

const CheckEmailForm = props => {
  
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
    baseLabel
  } = props;


  if (status && status === 'ok') {
    return <FormSuccess baseLabel={baseLabel} />;
  }


  return (
    <form onSubmit={handleSubmit}>

      <Typography template="legend" label={`${baseLabel}.form.intro`} />

       <TextInput
            
              id="email"
              label={`${baseLabel}.fields.email`}
              {...props}
        />

      <FormButton label={`${baseLabel}.form.submit`} {...props} />
    </form>
  );
};

CheckEmailForm.defaultProps = {
  url: 'https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl/check',
  baseLabel : "meetups",
  template : "pl-presenters-application",
  cc : ""
};

const enhance = compose(
  translate,
  withFormik
)

export default enhance(CheckEmailForm);