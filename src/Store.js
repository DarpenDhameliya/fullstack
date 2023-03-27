import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sellsliceReducer from './component/pages/sell/SellSlice'
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import dataReducer from './component/dataSlice'
import { createStore } from 'redux'

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, dataReducer)
// const reducer = combineReducers({
//   sellslice: sellsliceReducer,
//   data : dataReducer
// })

// const persistedReducer = persistReducer(persistConfig, reducer)

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }
export const store = configureStore({
  reducer: {
  sellslice: sellsliceReducer,
  // data : dataReducer

  // persistedReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
// export const persistor = persistStore(store)