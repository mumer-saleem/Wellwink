import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'

import api from 'Services/api'

export const cancelCallAction = createAsyncThunk(
  '',
   async (arg:any, thunkAPI) => {
     const{userId,callerId}=arg
     try {
      let response=  await api.create(AuthManager.getAuthHeaders()).cancelCall(userId,callerId) 
        return response;
  } catch (err:any) {
    if (!err.response) {
      throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)

 

