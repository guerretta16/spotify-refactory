import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from "./features/api/authSlice.ts";
import {spotifyApiSlice} from "./features/api/spotifyApiSlice.ts";
import {tokenSlice} from "./features/slices/tokenSlice.ts";

const rootReducers = combineReducers({
    [authSlice.reducerPath]: authSlice.reducer,
    [spotifyApiSlice.reducerPath]: spotifyApiSlice.reducer,
    'tokenSlice': tokenSlice.reducer
})

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authSlice.middleware).concat(spotifyApiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch