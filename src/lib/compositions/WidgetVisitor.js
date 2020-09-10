import React from 'react';
import WidgetRegForm from './WidgetRegForm'


const WidgetVisitor = (props) => (

  <WidgetRegForm {...props}  />

);

WidgetVisitor.defaultProps = {

  setting: "visitor.register",

  label : "visitors.register", //wrapper prop
  links: [], //wrapper prop
  secondaryLabel: null, //wrapper prop
  
  baseLabel: "visitors", //stepform prop

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
