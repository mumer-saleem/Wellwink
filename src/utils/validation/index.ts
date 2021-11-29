import * as Yup from "yup";
import PhoneNumber from "awesome-phonenumber";

export const PhoneValidation = Yup.string()
  .required("Required") .required("Required").min(10,"invalid number");
   

  
export const EmailValidation = Yup.string().required("Required").email("Invalid email");

  export const PasswordValidation = Yup.string()
  .required("Required").min(2);

  export const StrongPassword =Yup.string()
  .required('Please enter the')
  .matches(
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    "Minimum eight characters, at least one uppercase letter, At least one lowercase letter,At least one number and At least one special character"
  );


export const StringValidation = Yup.string().required("Required").trim();

 
export const PasswordValidationCases=(string:string)=>{

   let validationCases={
     upperCase:false,
     lowerCase:false,
     minimumCase:false,
     numberCase:false,
     specialCases:false
   }
   var formatSpecial = /^[#?!@$%^&*-]*$/;
   var formatUpperCase = /^[A-Z]*$/;
   var formatLowerCase = /^[a-z]*$/;
   var formatNumber = /^[0-9]*$/;
   for (let i = 0; i < string.length; i++) {
    if(formatSpecial.test(string[i]) ){
        validationCases={...validationCases,specialCases:true}
    }
    else if(formatUpperCase.test(string[i]) ){
      validationCases={...validationCases,upperCase:true}
     }
     else if(formatLowerCase.test(string[i]) ){
    validationCases={...validationCases,lowerCase:true}
     }
     else if(formatNumber.test(string[i]) ){
      validationCases={...validationCases,numberCase:true}
     }
  }
  return validationCases;
 
}
  
 
