import TextField from '@material-ui/core/TextField';
//import compose from 'recompose/compose';
import { translate } from '../i18n';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose'
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

const styles = theme => ({
    textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,

    },
    input: {
        fontSize: theme.typography.pxToRem(22),
        fontWeight: 700
    }
});

export const autoCompleteMappings = {
  email: 'email',
  fname: 'given-name',
  lname: 'family-name',
  cname2: 'org',
  position: 'organization-title',
  phone: 'tel-national'
};

const TextInput = props => {
  const {
    type,
    id,
    label,
    placeholder,
    classes,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    translate
  } = props;

  const renderError = id in errors;
  const translatedLabel = translate(label);

  return (
    <TextField
      id={id}
      label={translatedLabel}
      InputProps={{
        classes : {
          input : classes.input}
      }}
      value={id in values ? values[id] : ''}
      onChange={handleChange}
      onBlur={handleBlur}
      margin="normal"
      error={renderError}
      helperText={renderError ? errors[id] : ''}
      placeholder={placeholder ? translate(placeholder) : translatedLabel}
      autoComplete={id in autoCompleteMappings ? autoCompleteMappings[id] : ''}
      fullWidth
    />
  );
};

TextInput.defaultProps = {
  type: 'text'
};

const enhance = compose(
  translate,
  withStyles(styles)
)

export default enhance(TextInput);
