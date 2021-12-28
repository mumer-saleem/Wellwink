import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 
// import {videoCallAction} from 'Actions/videoCall/videoCall'
import {videoCallbject} from 'type'
 
export interface videoCallState {
  fetching: boolean|null,
  data: object|null,
  videoCallbject: videoCallbject,
  success: boolean|null,
  error: undefined|string
}


const initialState: videoCallState = {
  fetching: null,
  data: null,
  videoCallbject:{
    "callerFullName": "",
    "callerProfile": "",
    "roomNme": "",
  },
  success: null,
  error: undefined,
}
const videoCall = createSlice({
  name: 'videoCall',
  initialState,
  reducers: {
    setVideoCallbject: (state,action) => { 
      state.videoCallbject= action.payload  
    },
  },
  extraReducers: (builder) => {
   
 
}

}

)
export const { setVideoCallbject  } = videoCall.actions
 
export default videoCall.reducer