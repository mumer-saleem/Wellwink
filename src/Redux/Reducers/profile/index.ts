import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 
import {profileGetAction} from '../../../Actions/Profile/profileGetAction'

export interface ProfileState {
  fetching: boolean|null,
  data: object|null,
  success: boolean|null,
  error: undefined|string
}

const initialState: ProfileState = {
  fetching: null,
  data: null,
  success: null,
  error: undefined,
}
const Profile = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    udateImage: (state,action) => { 
       state.data.user={...state.data.user,profile_pic:action.payload}
    },
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(profileGetAction.pending, (state, action) => {
      state.fetching=true
    })
    builder.addCase(profileGetAction.fulfilled, (state, action) => {
 
      state.fetching= false,
      state.data=action.payload.data,
      state.error = undefined
      state.success= true
   })
   builder.addCase(profileGetAction.rejected, (state, action) => {
           state.success= false
        state.fetching=false
        state.error = action.payload.error
    
 })
 
}

}

)
// Action creators are generated for each case reducer function
export const { udateImage } = Profile.actions

export default Profile.reducer