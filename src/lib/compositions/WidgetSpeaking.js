import React from 'react';
import WidgetRegForm from './WidgetRegForm'


const WidgetSpeaking = (props) => (

  <WidgetRegForm  {...props}  />

);

WidgetSpeaking.defaultProps = {
 
  setting: "speakers.callforpapers",
  
  label : "presenters.form.title",
  baseLabel: "presenters",
  right: <div></div>,
  
  fields: [
    {name: "email", required: true},
    {name: "fname", required: true},
    {name: "lname", required: true},
    {name: "cname2", required: true},
    {name: "phone", required: true},
    {name: "presenter", required: true},  
    {
      name: "presentation_category", 
      required: true,
      options : "categories"
    },
    {name: "presentation_title", required: true},
    {name: "presentation_description", required: true}
  ],
  start: [
    'presenter',
    'presentation_title', 
    'presentation_description',
    'presentation_category',
    'cname2'
  ]

};

export default WidgetSpeaking;
