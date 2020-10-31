
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

    if( !("ticketId" in props) && !("role" in props) ){
      console.error("No ticketId/role set...", props);
      setStatus({error: {"message": "no ticketId/role set...."}});
      return;
    }
    
    const data = {
      fields: payload,
      tickets: "ticketId" in props? { [props.ticketId]: 1 } : {},
      role: "role" in props? props.role: null,
      template : "template" in props ? props.template : "pass template by props or settings",
      locale : "locale" in props ? props.locale : "",
      cc : "cc" in props ? props.cc : "" 
    }

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
        setStatus(data);

      });
  },
  displayName: 'MyFormikForm'
});
