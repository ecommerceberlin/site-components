import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
//import compose from 'recompose/compose';
import { translate } from '../i18n';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose'


const styles = theme => ({
    textField: {
        display: 'block',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,

    },
    container: {
          // display: 'flex',
          // flexWrap: 'nowrap',
    },
    menu: {
        width: 200,
        fontSize: theme.typography.pxToRem(22),
        fontWeight: 700
    },
});

 

const SelectInput = props => {
  const {
    id,
    label,
    placeholder,
    classes,
    value,
    error,
    setFieldValue,
    setFieldTouched,
    translate,
    options,
    required,
    validateField
  } = props;

   const translatedLabel = translate(label);

  return (
     <TextField
      select
      id={id}
      name={id}
      label={translatedLabel}
      value={value}
      onChange={
       (e, menuItemElement) => { setFieldValue(id, e.target.value, true); /*validateField(id);*/ }
      }
      onBlur={(e) => {setFieldTouched(id); validateField(id); }}
      margin="normal"
      error={Boolean(error)}
      helperText={error}
      placeholder={placeholder ? translate(placeholder) : translatedLabel}
      fullWidth
      required={required}
    > {options.map(option => (
      <MenuItem key={option} value={option}>
        {translate(`${label}_options.${option}`)}
      </MenuItem>
    ))}
    </TextField>
    
  );
};

SelectInput.defaultProps = {
  
};

const enhance = compose(
  translate,
  withStyles(styles)
)

export default enhance(SelectInput);
