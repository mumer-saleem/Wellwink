import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'

import api from 'Services/api'

export const LoginAction = createAsyncThunk(
  'Login/LoginAction',
   async (arg: any, thunkAPI) => {
    const {email,password}=arg
    try {
      let response=  await api.create().userLogin(email,password) 
       response.status==200&&AuthManager.setTokenResponse(response)
       return response;
  } catch (err:any) {
    const hasErrResponse = (err as { response: { [key: string]: string } }).response;
     if (!err.response) {
       throw  thunkAPI.rejectWithValue(err);
   }
         return thunkAPI.rejectWithValue({error:hasErrResponse.status});
         
  }
  }
)