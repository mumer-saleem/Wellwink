import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'
import api from 'Services/api'

export const smsOtpAction = createAsyncThunk(
  'SendOtp/smsOtpAction',
   async (arg: any, thunkAPI) => {
     try {
      let response=  await api.create().postSmsOtp(arg)
      return response;
  } catch (err:any) {
    if (!err.response) {
      throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)