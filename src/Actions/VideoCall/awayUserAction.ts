import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'

import api from 'Services/api'

export const awayUserAction = createAsyncThunk(
  '',
   async (online_status:any, thunkAPI) => {

    let obj={
      "online_status": online_status
      }

     try {
      let response=  await api.create(AuthManager.getAuthHeaders()).postAwayUser(obj) 
        return response;
  } catch (err:any) {
    if (!err.response) {
      throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)

 

