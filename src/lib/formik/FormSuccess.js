import React from 'react';
import { MyTypography } from '../components';

const FormSuccess = ({baseLabel}) => (
  <MyTypography label={`${baseLabel}.form.success`} template="alert" />
);

FormSuccess.defaultProps = {
  baseLabel : "visitors"
}

export default FormSuccess;
