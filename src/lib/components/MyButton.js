import React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslate } from '../i18n';

const MyButton = ({ label, ...rest }) => {

  const [translate] = useTranslate();
  
  return (
    <Button {...rest}>{translate(label)}</Button>
  );
}

MyButton.defaultProps = {
  label: 'pass label prop'
};

export default MyButton;
