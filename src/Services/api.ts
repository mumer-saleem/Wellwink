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
  