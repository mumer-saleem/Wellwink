import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 
import {emailOtpAction} from 'Actions/OtpActions/emailOtpAction'
import {smsOtpAction} from 'Actions/OtpActions/smsOtpAction'

 

export interface SendOtpState {
  fetching: boolean|null,
   success: boolean|null,
  error: undefined|string
}

const initialState: SendOtpState = {
  fetching: null,
   success: null,
  error: undefined,
}
const SendOtp = createSlice({
  name: 'SendOtp',
  initialState,
  reducers: {
  },
   extraReducers: (builder) => {
     builder.addCase(emailOtpAction.pending, (state, action) => {
      state.fetching=true
    })
    builder.addCase(emailOtpAction.fulfilled, (state, action) => {
 
      state.fetching= false,
       state.success= true
   })
   builder.addCase(emailOtpAction.rejected, (state, action) => {
    state.success= false
  state.fetching=false

})
builder.addCase(smsOtpAction.pending, (state, action) => {
  state.fetching=true
})
builder.addCase(smsOtpAction.fulfilled, (state, action) => {

  state.fetching= false,
   state.success= true
})
builder.addCase(smsOtpAction.rejected, (state, action) => {
state.success= false
state.fetching=false

})
 
 
}

}

)
// Action creators are generated for each case reducer function
 
export default SendOtp.reducer