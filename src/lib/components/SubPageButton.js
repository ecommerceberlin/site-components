import React from 'react';
import Button from '@material-ui/core/Button';
import { translate } from '../i18n';
import Router from 'next/router'

const scrollTo = (to, as) => {
    if(typeof window !== 'undefined'){
        Router.push(to).then(() => window.scrollTo(0, 0))
    }
}

const SubPageButton = ({ label, translate, locale, target, ...buttonProps }) => (
  <Button {...buttonProps} onClick={()=>scrollTo(target)}>{translate(label)}</Button>
);

SubPageButton.defaultProps = {
  target : "/no-target-defined",
  variant : "contained",
  label : "common.more",
  color : "primary",
  type : "button",
};

export default translate(SubPageButton);
