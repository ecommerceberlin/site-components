import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

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

const CheckBoxInput = props => {
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
    translate,
    setFieldValue
  } = props;

  const renderError = id in errors;
  const translatedLabel = translate(label);

  return (


    <FormGroup>
    <FormControlLabel
        control={<Checkbox 
            id={id}
            color="primary" 
            checked={id in values && values[id]}
            onChange={() => setFieldValue(id, !values[id]) }
            value="1" 
            // classes={classes}
        /> }
        label={translatedLabel}
      />
  
 
    {renderError && <FormHelperText error={true} id={id}>{errors[id]}</FormHelperText>}
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
