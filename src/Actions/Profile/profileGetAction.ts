import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'
 
import api from 'Services/api'

export const profileGetAction = createAsyncThunk(
  'Profile/profileGetAction',
   async (id: string, thunkAPI) => {
     try {
      let response=  await api.create(AuthManager.getAuthHeaders()).getProfile(id)
       console.log(response,"responseresponseresponseresponseresponseresponseresponseresponseresponse");
        return response;
  } catch (err:any) {
    if (!err.response) {
      throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)

 

