import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'
import {profileGetAction} from 'Actions/Profile/profileGetAction'
import {setProfileUpdateParams} from 'utils/setApiParams'


import api from 'Services/api'

export const actionUpdateProfile = createAsyncThunk(
  '',
   async (arg: any, thunkAPI) => {
     try {
      const params = setProfileUpdateParams(arg)
       let response=  await api.create(AuthManager.getAuthHeaders()).putProfileUpdate(params,arg.profileAbleID)
        thunkAPI.dispatch(profileGetAction(arg.profileAbleID))
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