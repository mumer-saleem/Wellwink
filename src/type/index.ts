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
export interface GeoLocationAddress{
  'complete_address': string ,
  'street_no': string ,
  'route': string ,
  'city': string ,
  'state': string ,
  'zip_code': string ,
  'placeID':string ,
  'lat':string ,
  'lng':string ,
   
}