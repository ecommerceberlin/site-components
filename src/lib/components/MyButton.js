import React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslate } from '../i18n';
import {useRouter} from 'next/router'

const MyButton = ({ label, href, ...rest }) => {

  const [translate] = useTranslate();
  const router = useRouter();

  if(href && !href.startsWith("http")){
    rest.onClick = () => router.push(href)
  }
  
  return (
    <Button href={href} {...rest}>{translate(label)}</Button>
  );
}

MyButton.defaultProps = {
  label: 'pass label prop'
};

export default MyButton;
