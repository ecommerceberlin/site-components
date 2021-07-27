import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

import { translate } from '../i18n';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose'


const styles = theme => ({
  
    input: {
        fontSize: theme.typography.pxToRem(22),
        fontWeight: 700
    }
});

 

const CheckBoxInput = props => {
  const {
    type,
    id,
    label,
    placeholder,
    classes,
    value,
    error,
    translate,
    setFieldValue,
    required,
    validateField,
    handleBlur,
    setFieldTouched
  } = props;

   const translatedLabel = translate(label);

  return (


    <FormGroup>
    <FormControlLabel
        control={<Checkbox 
            id={id}
            name={id}
            color="primary" 
            checked={Boolean(value)}
            onChange={ () => setFieldValue(id, !value, true) }
            onBlur={ (e) => { setFieldTouched(id, true);  validateField(id); }}
            value="1" 
            required={required}
            // classes={classes}
        /> }
        label={translatedLabel}
      />
  
 
    {error && <FormHelperText error={true} id={id}>{error}</FormHelperText>}
    </FormGroup>

  );
};

CheckBoxInput.defaultProps = {
  type: 'text'
};

const enhance = compose(
  translate,
  withStyles(styles)
)

export default enhance(CheckBoxInput);
