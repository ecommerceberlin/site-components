
import React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslate } from '../i18n';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

  textLink: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  }

}))


const MyButton = ({ label, href, className, ...rest }) => {

  const [translate] = useTranslate();
  const router = useRouter();
  const classes = useStyles();

  if(href && !href.startsWith("http")){
    rest.onClick = () => router.push(href)
  }
  
  return (
    <Button href={href} {...rest} className={classes[className]}>{translate(label)}</Button>
  );
}

MyButton.defaultProps = {
  variant: 'text',
  label: "link?",
  href: "/",
  size: 'small',
  color: 'default',
  icon: false,
  disabled: false,
  className: "textLink"
};

export default MyButton;
