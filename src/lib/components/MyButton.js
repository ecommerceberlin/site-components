import React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslate } from '../i18n';
import {useRouter} from 'next/router'
import isFunction from 'lodash/isFunction'
import { makeStyles } from '@material-ui/core/styles';
import isString from 'lodash/isString'

const useStyles = makeStyles(theme => ({
  textLink: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  }
}))

const MyButton = ({ label="no label prop", labelProps, href, className, ...rest }) => {

  const [translate] = useTranslate();
  const {push} = useRouter();
  const classes = useStyles();

  //automagically handle internal routing...
  if(href && isString(href) && !href.startsWith("http")){
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

  if("icon" in rest && !rest.icon){
    delete rest.icon
  }
  
  return (
    <Button href={href} {...rest} className={className? classes[className]: undefined}>{label ? translate(label, labelProps): null}</Button>
  );
}

export default MyButton;
