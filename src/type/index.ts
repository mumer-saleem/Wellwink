import { Reducers, } from 'Redux/Reducers/index'
import { store, } from 'Redux/ReduxPresist/ReduxPersist'


export type RootState = ReturnType<typeof Reducers>
export type AppDispatch = typeof store.dispatch
