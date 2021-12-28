import axios from 'axios';
import {signUp,SignIn,forgetPassword,sendOtp,verifyOtp,updateProfile} from 'type/apiParams'
import {apiConstants} from 'configs/Const'

 

const create = (headers:any=apiConstants.headers ,baseURL = apiConstants.baseURL) => {
     var instance = axios.create({
      baseURL:baseURL,
      timeout: apiConstants.timeout,
      headers: headers,
    });

    const userLogin = ( params:SignIn ) => { return instance.post('api/v1/auth/sign_in',params);  }
    const userSignUp =(params:signUp) => { return instance.post('api/v1/patients', params );}
    const postSmsOtp = ( params:sendOtp ) => { return instance.post('api/v1/patients/send_otp',params); }
    const postEmailOtp = ( params:sendOtp) => {return instance.post('api/v1/patients/send_email_otp',params); }
    const postVerifySmsOtp = (params:verifyOtp) => { return instance.post('api/v1/patients/verify_otp',params); }  
    const postVerifyEmailOtp = (params:verifyOtp) => {  return instance.post('api/v1/patients/verify_email_otp',params);  }  
   const postForgetPassword = ( params:forgetPassword ) => {  return instance.post('api/v1/auth/password',params); }  
   const getProfile = ( id:string ) => { return instance.get('api/v1/patients/'+id); }  
   const postImageUpload = ( params:any, ) => {return instance.post('api/v1/attachments',params); }  
   const putProfileUpdate = ( params:updateProfile,profileAbleID:string ) => {return instance.put('api/v1/patients/'+profileAbleID,params); }  
   const getAuthToken = (   ) => {return instance.get('/api/v1/video/auth_token' ); }


    return {
      userLogin, 
      userSignUp,
      postEmailOtp,
      postSmsOtp,
      postVerifyEmailOtp,
      postVerifySmsOtp,
      postForgetPassword,
      getProfile,
      putProfileUpdate,
      postImageUpload,
      getAuthToken
    }
  }
  // let's return back our create method as the default.
  export default {
    create
  }
  