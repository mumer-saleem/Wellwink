import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 
import {emailOtpVerification} from 'Actions/OtpActions/emailOtpVerification'
import {smsOtpVerification} from 'Actions/OtpActions/smsOtpVerification'

 

export interface verifyOtpState {
  fetching: boolean|null,
   success: boolean|null,
  error: undefined|string
}

const initialState: verifyOtpState = {
  fetching: null,
   success: null,
  error: undefined,
}
const verifyOtp = createSlice({
  name: 'verifyOtp',
  initialState,
  reducers: {
  },
   extraReducers: (builder) => {
     builder.addCase(emailOtpVerification.pending, (state, action) => {
      state.fetching=true
    })
    builder.addCase(emailOtpVerification.fulfilled, (state, action) => {
 
      state.fetching= false,
       state.success= true
   })
   builder.addCase(emailOtpVerification.rejected, (state, action) => {
    state.success= false
  state.fetching=false

})
builder.addCase(smsOtpVerification.pending, (state, action) => {
  state.fetching=true
})
builder.addCase(smsOtpVerification.fulfilled, (state, action) => {

  state.fetching= false,
   state.success= true
})
builder.addCase(smsOtpVerification.rejected, (state, action) => {
state.success=false
state.fetching=false

})

}
}

)
// Action creators are generated for each case reducer function
 
export default verifyOtp.reducer