import React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslate } from '../i18n';
import {useRouter} from 'next/router'
import isFunction from 'lodash/isFunction'

const MyButton = ({ label, href, ...rest }) => {

  const [translate] = useTranslate();
  const {push} = useRouter();

  //automagically handle internal routing...
  if(href && !href.startsWith("http")){
    let oldOnclick = function(){}
    if("onClick" in rest && isFunction(rest.onClick)){
      oldOnclick = rest.onClick
    }
    rest.onClick = (e) => {
      e.preventDefault()
      oldOnclick();
      push(href)
    }
  }
  
  return (
    <Button href={href} {...rest}>{label ? translate(label): null}</Button>
  );
}

MyButton.defaultProps = {
  label: 'pass label prop'
};

export default MyButton;
