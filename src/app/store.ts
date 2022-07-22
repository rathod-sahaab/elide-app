import { configureStore } from '@reduxjs/toolkit'
import { authSliceReducer } from '../features/auth/authSlice'
import { apiSlice } from './api/apiSlice'

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authSliceReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})
