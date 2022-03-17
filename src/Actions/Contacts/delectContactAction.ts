import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'

import api from 'Services/api'

export const deletePatientContactAction = createAsyncThunk(
  '',
   async (id:any, thunkAPI) => {
     try {
      let response=  await api.create(AuthManager.getAuthHeaders()).deletePatientContact(id) 
        return response;
  } catch (err:any) {
    if (!err.response) {
      throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)

 

