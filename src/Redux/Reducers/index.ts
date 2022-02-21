import {combineReducers} from '@reduxjs/toolkit';
import logIn from './login/signIn' 
import signUp from './signUp/signUp' 
import sendOtp from './Otp/sendOtp' 
import verifyOtp from './Otp/verifyOtp' 
import profile from './profile' 
import videoCall from './videoCall/videoCall' 
import enrolProgram from './enrolmentProgramm' 
import vitalsList from './vitalsList' 




 





/* ------------- Assemble The Reducers ------------- */
export const Reducers = combineReducers({ 
   LogIn:logIn ,
   signUp:signUp,
   sendOtp:sendOtp,
   verifyOtp:verifyOtp,
   profile:profile,
   videoCall:videoCall,
   enrolProgram:enrolProgram,
   vitalsList:vitalsList
}
)

 
