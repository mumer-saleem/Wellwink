import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 
import {LoginAction} from '../../../Actions/SignIn/login'

export interface LoginState {
  fetching: boolean|null,
  data: object|null,
  success: boolean|null,
  error: undefined|string
}

const initialState: LoginState = {
  fetching: null,
  data: null,
  success: null,
  error: undefined,
}
const logIn = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    signIn: (state) => { 
 
    },
    signOut: (state) => {

    },
 
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(LoginAction.pending, (state, action) => {
      state.fetching=true
    })
    builder.addCase(LoginAction.fulfilled, (state, action) => {
 
      state.fetching= false,
      state.data=action.payload.data.data,
      state.error = undefined
      state.success= true
   })
   builder.addCase(LoginAction.rejected, (state, action) => {
    console.log(action)
        state.success= false
        state.fetching=false
        state.error = action.payload.error
    
 })
}

}

)
// Action creators are generated for each case reducer function
export const { signIn, signOut  } = logIn.actions

export default logIn.reducer