

import React from 'react'
import StepForm  from '../../formik/StepForm';
import WidgetVisitor from '../../compositions/WidgetVisitor'

const CheckEmailForm = props => <StepForm 
  {...props} 
  onSuccess={(formProps) => "check email!" } 
  onError={ (formProps) => <WidgetVisitor 
    label="meetups.form.registration.title" 
    secondaryLabel="meetups.form.registration.description" 
    color="transparent" 
    right={null} 
    role="meetup" />} 
/>

CheckEmailForm.defaultProps = {
  api: `https://api.eventjuicer.com/v1/public/hosts/${process.env.NEXT_PUBLIC_PROJECT}/check`,
  baseLabel : "meetups",
  template : "pl-presenters-application",
  cc : "",
  fields: [  {name: "email", required: true} ],
  // start: ["email"],
  role: "meetup"
};
 
export default CheckEmailForm
