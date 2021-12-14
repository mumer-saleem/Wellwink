import {combineReducers} from '@reduxjs/toolkit';
import logIn from './login/signIn' 
import signUp from './signUp/signUp' 
import sendOtp from './Otp/sendOtp' 
import verifyOtp from './Otp/verifyOtp' 
import profile from './profile' 

 





/* ------------- Assemble The Reducers ------------- */
export const Reducers = combineReducers({ 
   LogIn:logIn ,
   signUp:signUp,
   sendOtp:sendOtp,
   verifyOtp:verifyOtp,
   profile:profile
   // ForgetPassword:ForgetPassword
}
)

 
