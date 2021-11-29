import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'
import api from 'Services/api'

export const emailOtpVerification = createAsyncThunk(
  'verifyOtp/emailOtpVerification',
   async (arg: any, thunkAPI) => {
    const {id,otp}=arg
    try {
      let response=  await api.create().postVerifyEmailOtp(id,otp)
      return response;
  } catch (err:any) {
    if (!err.response) {
      throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)