import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'
import api from 'Services/api'
import { object } from 'yup/lib/locale'
import {signupbject} from 'type'
import {signUp} from 'type/apiParams'
import {LoginAction} from 'Actions/SignIn/login'
import {emailOtpAction} from 'Actions/OtpActions/emailOtpAction'
import {smsOtpAction} from 'Actions/OtpActions/smsOtpAction'
import {setSignUpParams} from 'utils/setApiParams'


import  { useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
 

export const SignUpAction = createAsyncThunk(
  'signUp/SignUpAction',
   async (signupbject: signupbject, thunkAPI) => {
       try {
        const params = setSignUpParams(signupbject)
        let response=  await api.create().userSignUp(params)
       if( response.status==201){
        thunkAPI.dispatch(LoginAction({email:signupbject.email,password:signupbject.password }))
        thunkAPI.dispatch(smsOtpAction({id:response.data.hashid,type:'sms' }))
        thunkAPI.dispatch(emailOtpAction({id:response.data.hashid,type:'email' }))
         return response; 
       }
        }  catch (err:any) { 
          if (!err.response) {
             throw  thunkAPI.rejectWithValue(err);
          }
        return thunkAPI.rejectWithValue(err.response.data);  
       }
      }
)
 
// const setParams=(signupbject:any)=>{
//  return {
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
// }