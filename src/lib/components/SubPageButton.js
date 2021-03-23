import React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslate } from '../i18n';
import {useRouter} from 'next/router'


const SubPageButton = ({ label, target, ...buttonProps }) => {

  const [translate] = useTranslate();
  const {push} = useRouter();

  if(!("onClick" in target)){
    target.onClick = (e) => {
      e.preventDefault()
      push(target.href)
    }
  }

  return (<Button {...target} {...buttonProps} >{translate(label)}</Button>);

}

SubPageButton.defaultProps = {
  target : {href : "/no-target-defined"},
  variant : "contained",
  label : "common.more",
  color : "primary",
  type : "button",
};

export default SubPageButton;
