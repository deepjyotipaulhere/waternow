import { createSlice, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

const waternowSlice = createSlice({
  name: 'waternowSlice',
  initialState: {
    user: null
  },
  reducers: {
    setUser (state, payload) {
      state.user = payload.payload
    }
  }
})

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
      encryptTransform({
        secretKey: process.env.SECRET || '5cbf2970-66ea-45e3-ae78-19a54cf6d11e',
        onError: function (error) {
          console.log(error)
        }
      })
    ]
  }
  
  const persistedReducer = persistReducer(persistConfig, waternowSlice.reducer)
  

const store = configureStore({
  reducer: {
    waternowReducer: persistedReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
})

export default store
export const waternowActions = waternowSlice.actions