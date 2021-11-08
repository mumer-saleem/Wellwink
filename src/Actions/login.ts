import { createAsyncThunk } from '@reduxjs/toolkit'

import api from '../Services/api'
export const testing1 = createAsyncThunk(
  'counter/testing',
  async (_, thunkAPI) => {
    try {  
      api.create().userLogin().then(response => {
        return  response 
      })      
      .then(data => console.log(data,"datadatadata"));
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error});
     }
  }
)