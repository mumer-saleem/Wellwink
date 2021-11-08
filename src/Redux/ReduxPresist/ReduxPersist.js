 
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { persistStore, persistReducer } from 'redux-persist'
// import {Reducers} from '../Reducers/index'
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
// import { createStore } from 'redux'

// import { configureStore, Action } from '@reduxjs/toolkit'

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   stateReconciler: autoMergeLevel2
// };

// const persistedReducer = persistReducer(persistConfig, Reducers);
// export const store = createStore(persistedReducer);
// export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import {Reducers} from '../Reducers/index'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, Reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
