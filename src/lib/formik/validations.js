import * as Yup from 'yup';
import _pick from 'lodash/pick';


export const validations = {

  
      fname: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('First name is required.'),
  
      lname: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('Last name is required.'),
  
      cname2: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('Last name is required.'),
  
      phone: Yup.string()
      .min(9, 'Phone is valid?')
      .max(13, 'Phone is valid?')
      .required('Phone is required'),
      
      email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!')



  };
  
  export const validationSchema = ({ fields }) => {
    return Yup.object().shape(_pick(validations, Object.keys(fields || {})));
  };