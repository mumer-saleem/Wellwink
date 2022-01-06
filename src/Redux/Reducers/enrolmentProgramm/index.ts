import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 
import {enrolmentsAction} from 'Actions/Enrolments'
  
export interface enrolmentsState {
  fetching: boolean|null,
  data: any,
  success: boolean|null,
  error: undefined|string
}


const initialState: enrolmentsState = {
  fetching: null,
  data: null,
  success: null,
  error: undefined,
}
const enrolProgram = createSlice({
  name: 'enrolProgram',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(enrolmentsAction.pending, (state, action) => {
          state.fetching=true
        })
        builder.addCase(enrolmentsAction.fulfilled, (state, action) => {
     
          state.fetching= false,
          state.data=action.payload.data,
          state.error = undefined
          state.success= true
       })
       builder.addCase(enrolmentsAction.rejected, (state, action) => {
               state.success= false
            state.fetching=false
            state.error = action.payload.error
        
     })
   
}

}

)
  
export default enrolProgram.reducer