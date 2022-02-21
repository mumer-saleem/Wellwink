import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 
import {vitalsListsAction} from 'Actions/Vitals'
  
export interface vitalsState {
  fetching: boolean|null,
  data: any,
  success: boolean|null,
  error: undefined|string
}


const initialState: vitalsState = {
  fetching: null,
  data: null,
  success: null,
  error: undefined,
}
const vitalsList = createSlice({
  name: 'vitalsList',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(vitalsListsAction.pending, (state, action) => {
          state.fetching=true
        })
        builder.addCase(vitalsListsAction.fulfilled, (state, action) => {
     
          state.fetching= false,
          state.data=action.payload.data,
          state.error = undefined
          state.success= true
       })
       builder.addCase(vitalsListsAction.rejected, (state, action) => {
            state.success= false
            state.fetching=false
            state.error = action.payload.error
        
     })
   
}

}

)
  
export default vitalsList.reducer