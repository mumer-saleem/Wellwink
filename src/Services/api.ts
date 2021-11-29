import axios from 'axios';
import {signupbject} from 'type'

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

    const userLogin = ( email:string,password:string ) => {
      return instance.post('api/v1/auth/sign_in',{email:email,password:password});
    }
    const userSignUp = (signupbject:signupbject) => {
       return instance.post('api/v1/patients', {
        "patient": {
            "can_login": true,
            "age_year": "Year",
            "dob":  signupbject.db,
            "gender":"male",
            "mother_name": signupbject.gender,
            "name": signupbject.firstName+" "+signupbject.lastName,
            "patient_type": "online",
            "title": signupbject.title,
            "user_attributes": {
                "contact_hashid": "",
                "dob":  signupbject.db,
                "dob_stage": "3",
                "email":signupbject.email,
                "first_name":signupbject.firstName,
                "gender": "male",
                "last_name": signupbject.lastName,
                "password":signupbject.password,
                "password_confirmation": signupbject.password,
                "profile_pic_id": 0,
                "profileable_id": 0,
                "profileable_type": "",
                "selected_calendars": [],
                "username": "",
                "contact_numbers_attributes" : [
                    {
                        "custom_loaded": true,
                        "hashid": "",
                        "type": "phone",
                        "value": signupbject.phoneNumber
                    }
               
                ]
            
            }
            }
    }
      );
    }
    
    const postSmsOtp = ( id:string,type:string ) => {
      return instance.post('api/v1/patients/send_otp',{id:id,type:type});
    }
    const postEmailOtp = ( id:string,type:string ) => {
      return instance.post('api/v1/patients/send_email_otp',{id:id,type:type});
    }
    const postVerifySmsOtp = ( id:string,otp:string ) => {
      return instance.post('api/v1/patients/verify_otp',{id:id,otp:otp});
    }  
    const postVerifyEmailOtp = ( id:string,otp:string ) => {
       return instance.post('api/v1/patients/verify_email_otp',{id:id,otp:otp});
    }  
    const postForgetPassword = ( email:string,redirect_url:string ) => {
      return instance.post('api/v1/auth/password',{email:email,redirect_url:redirect_url});
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
  