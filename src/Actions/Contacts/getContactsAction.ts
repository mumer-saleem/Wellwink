import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'

import api from 'Services/api'

export const getPatientContacts = createAsyncThunk(
  '',
   async (id:any, thunkAPI) => {
     try {
       console.log(id)
      let response=  await api.create(AuthManager.getAuthHeaders()).getPatientContacts(id) 
        return response;
  } catch (err:any) {
    if (!err.response) {
      throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)

 

