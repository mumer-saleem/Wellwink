import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 
import {testing1} from '../../../Actions/login'

export interface LoginState {
  isLogin: boolean,
  list:Array<object>
}

const initialState: LoginState = {
  isLogin: false,
  list:[]
}

const logIn = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    signIn: (state) => { 
      state.isLogin =true
      console.log( state.isLogin," state.isLogin state.isLogin state.isLogin state.isLogin");
    },
    signOut: (state) => {
      state.isLogin=false
      console.log( state.isLogin," state.isLogin state.isLogin state.isLogin state.isLogin");

    },
 
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(testing1.pending, (state, action) => {
       console.log(action,"statestatestatestatestatestate")
    })
    builder.addCase(testing1.fulfilled, (state, action) => {
      console.log(action,"statestatestatestatestatestate")
   })
   builder.addCase(testing1.rejected, (state, action) => {
    console.log(action,"statestatestatestatestatestate")
 })
      // Add reducers for additional action types here, and handle loading state as needed
  

}

}

)
// Action creators are generated for each case reducer function
export const { signIn, signOut  } = logIn.actions

export default logIn.reducer