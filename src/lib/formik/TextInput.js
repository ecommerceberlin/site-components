import React from 'react';
import TextField from '@material-ui/core/TextField';
import { translate } from '../i18n';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose'

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
    value,
    error,
    handleChange,
    handleBlur,
    translate,
    required,
    validateField
  } = props;

  const translatedLabel = translate(label);
  const multiline =  id.indexOf("description") > -1

  return (
    <TextField
      id={id}
      name={id}
      label={translatedLabel}
      inputProps={{
        classes : {
          input : classes.input}
      }}
      value={value}
      onChange={(e) => { handleChange(e); validateField(id); }}
      onBlur={(e) => { handleBlur(e); validateField(id); }}
      margin="normal"
      multiline={multiline }
      rows={multiline ? 5 : undefined}
      rowsMax={multiline ? 20 : undefined}
      error={Boolean(error)}
      helperText={error}
      placeholder={placeholder ? translate(placeholder) : translatedLabel}
      autoComplete={id in autoCompleteMappings ? autoCompleteMappings[id] : ''}
      fullWidth
      required={required}
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
