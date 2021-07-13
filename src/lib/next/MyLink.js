
import React from 'react';
import MyButton from '../components/MyButton';

const MyLink = (props) => <MyButton {...props} />

MyLink.defaultProps = {
  variant: 'text',
  label: "link?",
  href: "/",
  size: 'small',
  color: 'default',
  icon: false,
  disabled: false,
  className: "textLink"
};

export default MyLink;
