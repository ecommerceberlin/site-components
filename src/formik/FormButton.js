import Button from '@material-ui/core/Button';

//import compose from 'recompose/compose';
import { translate } from '../i18n';

/*
dirty : false
errors : {}
handleBlur : ƒ (e)
handleChange : ƒ (e)
handleReset : ƒ ()
handleSubmit : ƒ (e)
id : "fname"
initialValues : {}
isSubmitting : false
isValid : false
label : "visitors.fields.fname"
locale : "pl"
placeholder : "visitors.fields.fname"
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
type : "text"
user : {}
validateForm : ƒ (values)
validateOnBlur : true
validateOnChange : true
values : {}
*/

const FormButton = props => {
  const {
    label,
    errors,
    isValid,
    translate,
    isSubmitting,
    handleSubmit
  } = props;

  //  const renderError = id in touched && id in errors

  return (
    <div style={{ textAlign: 'right' }}>
      <Button
        variant={isValid ? 'raised' : 'raised'}
        color={isValid ? 'primary' : 'secondary'}
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        {translate(label)}
      </Button>
    </div>
  );
};

FormButton.defaultProps = {};

export default translate(FormButton);
