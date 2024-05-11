import { createSlice, configureStore } from '@reduxjs/toolkit'

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



const store = configureStore({
  reducer: {
    waternowReducer: waternowSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
})

export default store
export const waternowActions = waternowSlice.actions