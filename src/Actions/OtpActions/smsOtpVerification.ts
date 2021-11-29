import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'
import api from 'Services/api'

export const smsOtpVerification = createAsyncThunk(
  'verifyOtp/smsOtpVerification',
   async (arg: any, thunkAPI) => {
    const {id,otp}=arg
    try {
      let response=  await api.create().postVerifySmsOtp(id,otp)
      
      return response;
  } catch (err:any) {
    if (!err.response) {
       throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)