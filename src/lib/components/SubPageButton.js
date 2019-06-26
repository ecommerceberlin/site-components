import React from 'react';
import Button from '@material-ui/core/Button';
import { translate } from '../i18n';
import Link from 'next/link'


const SubPageButton = ({ label, translate, locale, target, ...buttonProps }) => (

<Link {...target}>
<Button {...buttonProps} >{translate(label)}</Button>
</Link>

);

SubPageButton.defaultProps = {
  target : {to : "/no-target-defined"},
  variant : "contained",
  label : "common.more",
  color : "primary",
  type : "button",
};

export default translate(SubPageButton);
