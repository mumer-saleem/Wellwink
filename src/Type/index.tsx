import {Reducers} from '../Redux/Reducers/index'


export type ReducState = ReturnType<typeof Reducers>

export interface Header {
  'X-Custom-Header': string,
  
}