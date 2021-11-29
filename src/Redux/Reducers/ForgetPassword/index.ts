import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 
import {forgetPasswordAction} from 'Actions/ForgetPassword/forgetPasswordAction'
 
 

export interface ForgetPasswordState {
  fetching: boolean|null,
   success: boolean|null,
  error: undefined|string
}

const initialState: ForgetPasswordState = {
  fetching: null,
   success: null,
  error: undefined,
}
const ForgetPassword = createSlice({
  name: 'ForgetPassword',
  initialState,
  reducers: {
  },
   extraReducers: (builder) => {
     builder.addCase(forgetPasswordAction.pending, (state, action) => {
      state.fetching=true
    })
    builder.addCase(forgetPasswordAction.fulfilled, (state, action) => {
 
      state.fetching= false,
       state.success= true
   })
   builder.addCase(forgetPasswordAction.rejected, (state, action) => {
    state.success= false
  state.fetching=false

})
 
 
 
}

}

)
// Action creators are generated for each case reducer function
 
export default ForgetPassword.reducer