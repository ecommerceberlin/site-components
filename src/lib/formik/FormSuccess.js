import React from 'react';
import { Markdown } from '../components';
import { Box } from '@material-ui/core';

const FormSuccess = ({baseLabel}) => {
  
  return (
    <Box p={2} m={2} mb={6} border={1} borderRadius={1}>
    <Markdown big={true} label={`${baseLabel}.form.success`} />
    </Box>
  );


} 

FormSuccess.defaultProps = {
  baseLabel : "visitors"
}

export default FormSuccess;
