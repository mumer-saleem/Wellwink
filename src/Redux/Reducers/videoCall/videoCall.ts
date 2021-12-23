import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 
// import {videoCallAction} from 'Actions/videoCall/videoCall'
 
export interface videoCallState {
  fetching: boolean|null,
  data: object|null,
  videoCallbject: any,
  success: boolean|null,
  error: undefined|string
}

const initialState: videoCallState = {
  fetching: null,
  data: null,
  videoCallbject:{  },
  success: null,
  error: undefined,
}
const videoCall = createSlice({
  name: 'videoCall',
  initialState,
  reducers: {
    basicInfo: (state,action) => { 
      state.videoCallbject=  {...state.videoCallbject,
        // imageurl:action.payload.imageurl,
        title:action.payload.title,
        firstName:action.payload.firstName,
        lastName:action.payload.lastName,

      }   
    },
    otherInfo: (state,action) => {
 
      state.videoCallbject=  {...state.videoCallbject,
        gender:action.payload.gender,
        db:action.payload.db, 
        motherName:action.payload.motherName,
       }      
    },
    accountInfo: (state,action) => {
      state.videoCallbject=  {...state.videoCallbject,
        email:action.payload.email,
        phoneNumber:action.payload.phoneNumber,
        password:action.payload.password
      }      
     },
     
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(videoCallAction.pending, (state, action) => {
      state.fetching=true
    })
    builder.addCase(videoCallAction.fulfilled, (state, action) => {
 
      state.fetching= false,
      // state.data=action.payload.data,
      state.error = undefined
      state.success= true
   })
   builder.addCase(videoCallAction.rejected, (state, action) => {
     console.log(action,"sign up action action")
          state.success= false
          state.fetching=false
          state.error = action.payload.error;
 })
 
}

}

)
 export const { basicInfo, otherInfo,accountInfo  } = videoCall.actions

export default videoCall.reducer