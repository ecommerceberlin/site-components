import * as Yup from 'yup';
import _pick from 'lodash/pick';



Yup.addMethod(Yup.string, "conditionallyRequire", function(requiredFieldNames, message) {

  return this.test("is-required", message, function(value) {

      const { path, createError } = this;

      return path in requiredFieldNames ? value.length > 0 : true;
     
  });
});


export const validations = (requiredFieldNames) => ({

  
      fname: Yup.string()
    //  .min(2, "C'mon, your first name is longer than that")
      .conditionallyRequire(requiredFieldNames, 'First name is required.'),
  
      lname: Yup.string()
      .min(2, "C'mon, your last name is longer than that")
      .conditionallyRequire(requiredFieldNames, 'Last name is required.'),
  
      cname2: Yup.string()
      .min(2, "C'mon, your company is probably longer than that")
      .conditionallyRequire(requiredFieldNames, 'Company name is required.'),
  
      phone: Yup.string()
      .min(9, 'Phone is valid?')
      .max(13, 'Phone is valid?')
      .conditionallyRequire(requiredFieldNames, 'Phone number is required'),
      
      email: Yup.string()
      .email('Invalid email address')
      .conditionallyRequire(requiredFieldNames, 'Valid email is required!'),

      presentation_title: Yup.string()
      .min(2, "Too short :(")
      .max(200, 'Please make it shorter.')
      .conditionallyRequire(requiredFieldNames, 'Valid presentation title is required.'),


  });
  
  export const validationSchema = ({fields}) => {
    const fieldNames = fields.map(item => item.name);
    const requiredFieldNames = fields.filter(item => "required" in item && item.required).map(item => item.name)
    return Yup.object().shape(_pick(validations(requiredFieldNames), fieldNames));
  };

 