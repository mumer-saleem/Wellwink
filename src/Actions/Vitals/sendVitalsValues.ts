import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'
import {setVitalsValueParams} from 'utils/setObjects'


import api from 'Services/api'
export const sendVitalsValues = createAsyncThunk(
  '',
   async (obj:any, thunkAPI) => {
     let params=await setVitalsValueParams(obj)
     try {
      let response=  await api.create(AuthManager.getAuthHeaders()).postVitalsValues(params) 
        return response;
  } catch (err:any) {
    if (!err.response) {
      throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)

 

