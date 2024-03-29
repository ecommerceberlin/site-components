import React from 'react'
import { withFormik } from 'formik';
import fetch from 'isomorphic-unfetch';
import { validationSchema } from './validations';
import isEmpty from 'lodash/isEmpty'

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

    if( !("ticket_id" in props) && !("token" in props) && !("tickets" in props) && !("role" in props)  ){
      console.error("ticket_id, tickets, role or token must be set!", props);
      setStatus({error: {"message": "ticket_id, tickets, role or token must be set!"}});
      setSubmitting(false);
      return;
    }
    
    const data = {
      fields: payload,
      tickets: !isEmpty(props.tickets)? props.tickets: {[props.ticket_id]: {quantity: 1, formdata: {}}},
      // tickets: "ticketId" in props && props.ticketId? { [props.ticketId]: 1 } : props.tickets,
      token: "token" in props? props.token: null,
      uuid: "uuid" in props? props.uuid: null,
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
          setSubmitting(false);
        }
        return response.json();
      }).then(data => {
        setSubmitting(false);
        setStatus(data);
      });
  },
  displayName: 'MyFormikForm'
});
