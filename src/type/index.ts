import { Reducers, } from 'Redux/Reducers/index'
import { store, } from 'Redux/ReduxPresist/ReduxPersist'


export type RootState = ReturnType<typeof Reducers>
export type AppDispatch = typeof store.dispatch

export interface signupbject{
  firstName:string|null,
  lastName:string|null,
  title:string|null,
  gender:string|null,
  db:string|null,
  motherName:string|null,
  password:string|null,
  email:string|null,
  phoneNumber:string|null,
  
  // imageurl:object|null,
  
}
