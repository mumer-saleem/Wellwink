import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'
import api from 'Services/api'

export const emailOtpVerification = createAsyncThunk(
  'verifyOtp/emailOtpVerification',
   async (arg: any, thunkAPI) => {
     try {
      let response=  await api.create().postVerifyEmailOtp(arg)
      return response;
  } catch (err:any) {
    if (!err.response) {
      throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)