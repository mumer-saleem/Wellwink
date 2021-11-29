import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 
import {SignUpAction} from 'Actions/SignUp/signUp'
import {signupbject} from 'type'

export interface signUpState {
  fetching: boolean|null,
  data: object|null,
  signupbject:signupbject
  success: boolean|null,
  error: undefined|string
}

const initialState: signUpState = {
  fetching: null,
  data: null,
  signupbject:{
    firstName: null,
    lastName: null,
    title:null,
    // imageurl:null,
    gender:null,
    db:null,
    motherName:null,
    password:null,
    email:null,
    phoneNumber:null,
   },
  success: null,
  error: undefined,
}
const signUp = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    basicInfo: (state,action) => { 
 
      state.signupbject=  {...state.signupbject,
        // imageurl:action.payload.imageurl,
        title:action.payload.title,
        firstName:action.payload.firstName,
        lastName:action.payload.lastName,

      }   
    },
    otherInfo: (state,action) => {
 
      state.signupbject=  {...state.signupbject,
        gender:action.payload.gender,
        db:action.payload.db,
        motherName:action.payload.motherName,
       }      
    },
    accountInfo: (state,action) => {
      state.signupbject=  {...state.signupbject,
        email:action.payload.email,
        phoneNumber:action.payload.phoneNumber,
        password:action.payload.password
      }      
     },
     
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(SignUpAction.pending, (state, action) => {
      state.fetching=true
    })
    builder.addCase(SignUpAction.fulfilled, (state, action) => {
 
      state.fetching= false,
      state.data=action.payload.data,
      state.error = undefined
      state.success= true
   })
   builder.addCase(SignUpAction.rejected, (state, action) => {
     console.log(action,"sign up action action")
          state.success= false
          state.fetching=false
          state.error = action.payload.error;
 })
 
}

}

)
 export const { basicInfo, otherInfo,accountInfo  } = signUp.actions

export default signUp.reducer