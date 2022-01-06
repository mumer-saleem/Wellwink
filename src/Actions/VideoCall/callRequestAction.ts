import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'
 

import api from 'Services/api'

export const callRequestAction = createAsyncThunk(
  '',
   async (arg: any, thunkAPI) => {
    // const {email,url}=arg
    var data = new FormData();
    data.append("call_type", arg.type)
    data.append("id",arg.id)
    try {
      let response=  await api.create({...AuthManager.getAuthHeaders(),"Content-Type": "multipart/form-data"}).postCallRequest(data)
         return response;
  } catch (err:any) {
    if (!err.response) {
      throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)

 

