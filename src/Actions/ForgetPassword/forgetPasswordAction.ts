import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'

import api from 'Services/api'

export const forgetPasswordAction = createAsyncThunk(
  'ForgetPassword/forgetPasswordAction',
   async (arg: any, thunkAPI) => {
    // const {email,url}=arg
    try {
      let response=  await api.create().postForgetPassword(arg) 
        return response;
  } catch (err:any) {
    if (!err.response) {
      throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)

 

