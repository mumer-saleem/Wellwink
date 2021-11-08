import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import ReduxPersist from '../ReduxPresist/ReduxPersist'
 


/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
   
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }
  return store
}
