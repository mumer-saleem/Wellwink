import {combineReducers} from '@reduxjs/toolkit';
import logIn from './login/signIn' 


/* ------------- Assemble The Reducers ------------- */
export const Reducers = combineReducers({ 
   LogIn:logIn 
}
)

 
