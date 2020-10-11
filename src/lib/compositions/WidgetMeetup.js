
import React from 'react'
import StepForm  from '../formik/StepForm';
import Settings from '../datasources/Settings';

const WidgetMeetup = (props) => <Settings>{(get) => {
 
  const {setting, baseLabel, fields, options, ticket_id, start, email_template, legend} = props;

  const fieldsWithOptions = get(`${setting}.fields`, fields).map(field => "options" in field && options && field.options in options ? {...field, options: options[field.options]} : field)

  return (<StepForm 
  {...props} 
  onSuccess={(formProps) => "check email!" } 
  onError={ (formProps) => <StepForm
    baseLabel={ get(`${setting}.baseLabel`, baseLabel) }
    data={ formProps.values }
    ticketId={ get(`${setting}.ticket_id`, ticket_id) }
    fields={fieldsWithOptions}
    start={get(`${setting}.start`, start)}
    template={ get(`${setting}.email_template`, email_template) }
    api={ get("visitor.api") }
    role="meetup"
    legend={ legend }
  />}
/>)}}</Settings>
  

WidgetMeetup.defaultProps = {
  setting: "visitor.register",
  api: `https://api.eventjuicer.com/v1/public/hosts/${process.env.NEXT_PUBLIC_PROJECT}/check`,
  baseLabel : "visitor",
  template : "pl-presenters-application",
  cc : "",
  fields: [  {name: "email", required: true} ],
  // start: ["email"],
  role: "meetup",
  legend: "meetups.registration.description" 
};
 
export default WidgetMeetup
