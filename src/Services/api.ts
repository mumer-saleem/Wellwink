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
   const cancelCall= ( userId:string, callerId:string ) => {return instance.get('/video/broadcast_call_cancelled?patient_user_id=' + userId + '&caller_id=' + callerId ); }
   const postAwayUser=   ( params:any, ) => {return instance.post('api/v1/users/set_online_status',params); } 
   const getEnrolments=   ( id:string ) => {return instance.get('api/v1/enrolments/patient_enrolments?id='+id); } 
   const postCallRequest=   ( params:any, ) => {return instance.post('api/v1/enrolments/call_alert',params); } 
   const getVitalsLists=   (id:string ) => {return instance.get('api/v1/vitals/patient_vital_entry?patient_id='+id); } 
   const postVitalsValues=   (params:any,) => {return instance.post('api/v1/vitals',params); } 
   const getInsurance=   (id:any,) => {return instance.post('api/v1/insurance/patient_insurances?patient_id='+id); } 
   const getPatientContacts=   (id:any,) => {return instance.post('api/v1/patients/contact?id='+id); } 
   const deletePatientContact=   (id:any,) => {return instance.post('api/v1/patients/contact?id='+id); } 
   const postPAtientContact=   (params:any,) => {return instance.post('api/v1/patients/contact',params); } 



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
      getAuthToken,
      cancelCall,
      postAwayUser,
      getEnrolments,
      postCallRequest,
      getVitalsLists,
      postVitalsValues,
      getInsurance,
      getPatientContacts,
      deletePatientContact,
      postPAtientContact,

    }
  }
  // let's return back our create method as the default.
  export default {
    create
  }
  