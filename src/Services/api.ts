import axios from 'axios';
import {signUp,SignIn,forgetPassword,sendOtp,verifyOtp} from 'type/apiParams'

const headers = {
  'X-Custom-Header': 'foobar'
}
// baseURL: "http://192.168.4.169:3000/",
//  hjasasn 
// baseURL: "http://192.168.5.84:3000/",
// own


const create = (headers:any=headers ,baseURL = 'http://192.168.5.84:3000/') => { 

     var instance = axios.create({
      baseURL:baseURL,
      timeout: 3000,
      headers: headers,
    });

    const userLogin = ( params:SignIn ) => {
      return instance.post('api/v1/auth/sign_in',params);
    }
    const userSignUp = (params:signUp) => {
       return instance.post('api/v1/patients', params
    //    {
    //     "patient": {
    //         "can_login": true,
    //         "age_year": "Year",
    //         "dob":  signupbject.db,
    //         "gender":signupbject.gender,
    //         "mother_name": signupbject.gender,
    //         "name": signupbject.firstName+" "+signupbject.lastName,
    //         "patient_type": "online",
    //         "title": signupbject.title,
    //         "user_attributes": {
    //             "contact_hashid": "",
    //             "dob":  signupbject.db,
    //             "dob_stage": "3",
    //             "email":signupbject.email,
    //             "first_name":signupbject.firstName,
    //             "gender": signupbject.gender,
    //             "last_name": signupbject.lastName,
    //             "password":signupbject.password,
    //             "password_confirmation": signupbject.password,
    //             "profile_pic_id": 0,
    //             "profileable_id": 0,
    //             "profileable_type": "",
    //             "selected_calendars": [],
    //             "username": "",
    //             "contact_numbers_attributes" : [
    //                 {
    //                     "custom_loaded": true,
    //                     "hashid": "",
    //                     "type": "phone",
    //                     "value": signupbject.phoneNumber
    //                 }
               
    //             ]
            
    //         }
    //         }
    // }
      );
    }
    
    const postSmsOtp = ( params:sendOtp ) => {
      return instance.post('api/v1/patients/send_otp',params);
    }
    const postEmailOtp = ( params:sendOtp) => {
      return instance.post('api/v1/patients/send_email_otp',params);
    }
    const postVerifySmsOtp = (  params:verifyOtp) => {
      return instance.post('api/v1/patients/verify_otp',params);
    }  
    const postVerifyEmailOtp = (  params:verifyOtp ) => {
       return instance.post('api/v1/patients/verify_email_otp',params);
    }  
    const postForgetPassword = ( params:forgetPassword ) => {
      return instance.post('api/v1/auth/password',params);
   }  
  
    return {
      userLogin, 
      userSignUp,
      postEmailOtp,
      postSmsOtp,
      postVerifyEmailOtp,
      postVerifySmsOtp,
      postForgetPassword
    }
  }
  
  // let's return back our create method as the default.
  export default {
    create
  }
  