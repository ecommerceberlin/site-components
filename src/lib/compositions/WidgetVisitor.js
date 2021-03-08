import React from 'react';
import WidgetRegForm from './WidgetRegForm'


const WidgetVisitor = (props) => (

  <WidgetRegForm {...props}  />

);

WidgetVisitor.defaultProps = {

  wrapperProps: {
    label : "visitors.register", //wrapper prop,
    secondaryLabel: null, //wrapper prop

  },

  setting: "visitor.register",
  baseLabel: "visitors", //stepform prop
  links: [], //wrapper prop
  right: "/lanyard.jpg", //grid prop

  fields : [
    {name: "email", required: true},
    {name: "fname", required: true},
    {name: "lname", required: true},
    {name: "cname2", required: true},
    {name: "position", required: true},
    {name: "nip", required: false},
    {name: "phone", required: true}
  ],

  start : ['email', 'fname'],
  
};

export default WidgetVisitor;
