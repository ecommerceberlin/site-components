import { withFormik } from 'formik';
import fetch from 'isomorphic-unfetch';

import { addToken } from '../helpers';
import { validationSchema } from './validations';

export const filterFields = (fields, start = []) => {
  //fields array of objects
  //start array
  return Array.isArray(start) && start.length ? fields.filter(item => start.indexOf(item.name) === -1) : fields;
};

export const startFields = (fields, start = []) => {
  //fields array of objects
  //start array
  return Array.isArray(start) && start.length ? fields.filter(item => start.indexOf(item.name) > -1) : [];
};

export default withFormik({
  validationSchema: validationSchema,
  isInitialValid: false,
  validateOnBlur: true,
  validateOnChange: true,
  //RE-RENDER on wrapped component props change?
  enableReinitialize: false,
  mapPropsToValues: ({ data }) => ({
    ...data
  }),
  handleSubmit: (payload, { props, setSubmitting, setErrors, setStatus }) => {


    if(! "ticketId" in props || props.ticketId < 1){
      console.log("passed props", props);
      setStatus('error');
      return;
    }

    //we should have redux actions?
    
    const data = {
      fields: payload,
      tickets: { [props.ticketId]: 1 },
      template : "template" in props ? props.template : "pass template by props or settings",
      locale : "locale" in props ? props.locale : "",
      cc : "cc" in props ? props.cc : "" 
    }

    // console.log(data); return;

    setSubmitting(true);

    fetch(props.api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status !== 200) {
          console.log("passed props", props);
          console.log("final data", data)
        }
        return response.json();
      })
      .then(data => {

        setSubmitting(false);

        if ('data' in data && 'token' in data.data) {
          addToken(data.data.token);
          setStatus('ok');
        }

        //error?
        if ('error' in data) {
          setStatus('error');
        }
      });
  },
  displayName: 'MyForm'
});
