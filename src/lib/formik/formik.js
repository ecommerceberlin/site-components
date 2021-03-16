import React from 'react'
import { withFormik } from 'formik';
import fetch from 'isomorphic-unfetch';
import { validationSchema } from './validations';

export const filterFields = (fields, start = []) => {
  return Array.isArray(start) && start.length ? fields.filter(item => start.indexOf(item.name) === -1) : fields;
};

export const startFields = (fields, start = []) => {
  return Array.isArray(start) && start.length ? fields.filter(item => start.indexOf(item.name) > -1) : [];
};

export default withFormik({
  validationSchema: validationSchema,
  validateOnMount: false,
  validateOnBlur: false,
  validateOnChange: false,
  enableReinitialize: false,
  mapPropsToValues: ({ data }) => ({
    ...data
  }),

  handleSubmit: (payload, { props, setSubmitting, setErrors, setStatus }) => {

    if( !("token" in props && "ticketId" in props && "role" in props) ){
      console.error("No ticketId/role set...", props);
      setStatus({error: {"message": "no ticketId/role set...."}});
      return;
    }
    
    const data = {
      fields: payload,
      tickets: "ticketId" in props && props.ticketId? { [props.ticketId]: 1 } : {},
      token: "token" in props? props.token: null,
      role: "role" in props? props.role: null,
      report: "report" in props? props.report: "",
      template : "template" in props ? props.template : "",
      locale : "locale" in props ? props.locale : "",
      cc : "cc" in props ? props.cc : "",
      bcc : "bcc" in props ? props.bcc : ""  
    }

    setSubmitting(true);

    fetch(props.api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
        if (response.status !== 200) {
          console.log("passed props", props);
          console.log("final data", data)
        }
        return response.json();
      }).then(data => {

        setSubmitting(false);
        setStatus(data);

      });
  },
  displayName: 'MyFormikForm'
});
