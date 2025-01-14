import * as Yup from 'yup';
import _pick from 'lodash/pick';

Yup.addMethod(Yup.string, "validateNip", function(message){
    return this.test("is_valid_nip", message, function(value){
        const { path, createError} = this;

        value = value.replace(/[\ \-]/gi, '');

        let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
        let sum = 0;
        let controlNumber = parseInt(value.substring(9, 10));
        for (let i = 0; i < weight.length; i++) {
        sum += (parseInt(value.substr(i, 1)) * weight[i]);
        }

        if(sum % 11 !== controlNumber){
            return createError({path, message})
        }

        return true
    });
});

Yup.addMethod(Yup.mixed, "requireWhenRequired", function(requiredFieldNames, message) {

  return this.test("is-required", message, function(value) {

      const { path, createError, schema} = this;

      if(requiredFieldNames.includes(path)){

        if(typeof value !== "undefined"){
            switch(schema.type){
                case "boolean":
                    if(value === true || value === false){
                        return true;
                    }
                break;
    
                case "string":
                    if(value !== ""){
                        return true;
                    }
                break;
            }
        }
        
        return createError({path, message})

      }

      return true;

  });
});

// optionalObject: yup.lazy(value => {
//     if (value !== undefined) {
//       return yup.object().shape({
//         otherData: yup.string().required(),
//       });
//     }
//     return yup.mixed().notRequired();
//   }),


export const validations = (requiredFieldNames) => ({

    referral: Yup.string()
      .min(2, "Too short :(")
      .max(200, 'Invalid')
      .requireWhenRequired(requiredFieldNames, 'Access code is required.'),
  
      fname: Yup.string()
      .min(2, "C'mon, your first name is longer than that")
      .max(200, 'Invalid')
      .requireWhenRequired(requiredFieldNames, 'First name is required.'),
  
      lname: Yup.string()
      .min(2, "C'mon, your last name is longer than that")
      .max(200, 'Invalid')
      .requireWhenRequired(requiredFieldNames, 'Last name is required.'),
  
      cname: Yup.string()
      .min(2, "C'mon, your company is probably longer than that")
      .max(200, 'Invalid')
      .requireWhenRequired(requiredFieldNames, 'Company name is required.'),


      company_address: Yup.string()
      .min(10, "C'mon, your company address is probably longer than that")
      .max(500, 'Too long')
      .requireWhenRequired(requiredFieldNames, 'Company address is required.'),


      cname2: Yup.string()
      .min(2, "C'mon, your company is probably longer than that")
      .max(200, 'Invalid')
      .requireWhenRequired(requiredFieldNames, 'Company name is required.'),

      position: Yup.string()
      .min(2, "Should be longer")
      .max(100, 'Too long - 100 chars max')
      .requireWhenRequired(requiredFieldNames, 'This field is required.'),
  
      phone: Yup.string()
      .min(9, 'Phone number seems too short')
      .max(15, 'Phone number is too long. Use numbers only.')
      .requireWhenRequired(requiredFieldNames, 'Phone number is required'),
      
      email: Yup.string()
      .email('Invalid email address')
      .requireWhenRequired(requiredFieldNames, 'Valid email is required!'),


      company_website: Yup.string()
      .min(5, "URL address seems invalid")
      .max(200, 'URL address seems invalid')
      .requireWhenRequired(requiredFieldNames, 'URL address is required.'),

      avatar: Yup.string()
      .min(5, "URL address seems invalid")
      .max(200, 'URL address seems invalid')
      .requireWhenRequired(requiredFieldNames, 'URL address is required.'),

      logotype: Yup.string()
      .min(5, "URL address seems invalid")
      .max(200, 'URL address seems invalid')
      .requireWhenRequired(requiredFieldNames, 'URL address is required.'),

      video: Yup.string()
      .min(5, "URL address seems invalid")
      .max(200, 'URL address seems invalid')
      .requireWhenRequired(requiredFieldNames, 'URL address is required.'),


      awards_category: Yup.string()
      .min(2, "Please choose category")
      .max(200, 'Please choose category')
      .requireWhenRequired(requiredFieldNames, 'Please choose category'),

      accept: Yup.bool()
      .oneOf([true], 'Please accept terms')
      .required('Please accept terms')
      .requireWhenRequired(requiredFieldNames, 'Please accept terms'),

      terms_and_conditions: Yup.bool()
      .oneOf([true], 'Please accept terms')
      .required('Please accept terms')
      .requireWhenRequired(requiredFieldNames, 'Please accept terms'),


      location: Yup.string()
      .oneOf(["yes", "no"], 'Please select one of the following')
      .requireWhenRequired(requiredFieldNames, 'Please select one of the following'),

      party_participant_type: Yup.string()
      .min(2, "Please select")
      .max(200, 'Please select')
      .requireWhenRequired(requiredFieldNames, 'Please select one of the following'),

      presenter: Yup.string()
      .min(2, "Too short :(")
      .max(200, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Valid presenter first and last names are required.'),

      presentation_title: Yup.string()
      .min(20, "Too short :(")
      .max(200, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Valid presentation title is required.'),


      presentation_category: Yup.string()
      .min(1, "Too short :(")
      .max(200, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Valid presentation category is required.'),

    
      presentation_description: Yup.string()
      .min(100, "Too short :(")
      .max(2000, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Valid description is required (100 - 2000 chars).'),

      bio: Yup.string()
      .min(100, "Too short :(")
      .max(2000, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Valid BIO is required (100 - 2000 chars).'),


      project_name: Yup.string()
      .min(2, "Too short :(")
      .max(200, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Product/service name is required (2-200 chars).'),

      project_description: Yup.string()
      .min(100, "Too short :(")
      .max(2000, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Product/service description is required (100 - 2000 chars).'),


      difference: Yup.string()
      .min(100, "Too short :(")
      .max(2000, 'Please make it shorter (min 100, max 2000 chars).')
      .requireWhenRequired(requiredFieldNames, 'Text is required (100 - 2000 chars).'),

      innovations: Yup.string()
      .min(100, "Too short :(")
      .max(2000, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Text is required (100 - 2000 chars).'),

      testimonials: Yup.string()
      .min(100, "Too short :(")
      .max(2000, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Text is required (100 - 2000 chars).'),

      case_study: Yup.string()
      .min(100, "Too short :(")
      .max(2000, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Text is required (100 - 2000 chars).'),

      confidential: Yup.string()
      .min(10, "Too short :(")
      .max(2000, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Text is required (100 - 2000 chars).'),

      nip: Yup.string()
      .min(9, "Too short :(")
      .max(15, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Registration number is required'),

      profile_linkedin: Yup.string()
      .min(10, "Too short :(")
      .max(100, 'Please make it shorter.')
      .requireWhenRequired(requiredFieldNames, 'Url to linkedin profile is required'),

      participant_type: Yup.string()
      .min(5, "Too short :(")
      .max(100, '')
      .requireWhenRequired(requiredFieldNames, 'Please select one of the following'),

      company_role: Yup.string()
      .min(5, "Too short :(")
      .max(100, '')
      .requireWhenRequired(requiredFieldNames, 'Please select one of the following'),

      employee: Yup.string()
      .min(5, "Too short :(")
      .max(100, '')
      .requireWhenRequired(requiredFieldNames, 'Please select one of the following'),

      revenue: Yup.string()
      .min(5, "Too short :(")
      .max(100, '')
      .requireWhenRequired(requiredFieldNames, 'Please select one of the following'),

      business_model: Yup.string()
      .min(5, "Too short :(")
      .max(100, '')
      .requireWhenRequired(requiredFieldNames, 'Please select one of the following'),

      objective: Yup.string()
      .min(5, "Too short :(")
      .max(100, '')
      .requireWhenRequired(requiredFieldNames, 'Please select one of the following'),




      


  });
  

  export const validationSchema = ({fields}) => {
    const fieldNames = fields.map(item => item.name);
    const requiredFieldNames = fields.filter(item => "required" in item && item.required).map(item => item.name)
    return Yup.object(_pick(validations(requiredFieldNames), fieldNames));
  };

 