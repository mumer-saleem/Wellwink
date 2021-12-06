import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'
import {udateImage} from 'Redux/Reducers/profile'


import api from 'Services/api'

export const uploadImageAction = createAsyncThunk(
  '',
   async (arg: any, thunkAPI) => {
    // const {email,url}=arg
    var data = new FormData();
    data.append("attachable_type", "User")
    data.append("filetype", "profile_pic") 
     data.append('file', {
      uri: arg.file,
      name: 'profilePhoto.jpg',
      type: 'image/jpeg',
  })
    data.append("description", "")
    data.append("title", "")
    data.append("attachable_id",arg.id)
    try {
      let response=  await api.create({...AuthManager.getAuthHeaders(),"Content-Type": "multipart/form-data"}).postImageUpload(data)
    
      thunkAPI.dispatch(udateImage(response.data.profile_pic))
        return response;

  } catch (err:any) {
    if (!err.response) {
      throw  thunkAPI.rejectWithValue(err);
   }
      return thunkAPI.rejectWithValue(err.response.data);
  }
  }
)

 

