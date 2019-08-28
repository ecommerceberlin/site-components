import * as Yup from 'yup';
import _pick from 'lodash/pick';


export const validations = (requiredFieldNames) => ({

  
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

  });
  
  export const validationSchema = ({fields}) => {
    const fieldNames = fields.map(item => item.name);
    const requiredFieldNames = fields.filter(item => "required" in item && item.required).map(item => item.name)
    return Yup.object().shape(_pick(validations(requiredFieldNames), fieldNames));
  };

 