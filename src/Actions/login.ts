import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthManager from 'Services/authenticationManager'

import api from 'Services/api'

export const LoginAction = createAsyncThunk(
  'Login/LoginAction',
   async (arg: any, thunkAPI) => {
    const {email,password}=arg
  
    return  await api.create().userLogin(email,password).then(response => {
   
      response.status==200&&AuthManager.setTokenResponse(response)
      return  response
      })   
     
  }
)