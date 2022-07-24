import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSliceReducer } from '../features/auth/authSlice'
import { apiSlice } from './api/apiSlice'

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

import storage from 'redux-persist/lib/storage'
import { linksSliceReducer } from '../features/links/linksSlice'

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	blacklist: ['links'],
}

const rootReducer = combineReducers({
	auth: authSliceReducer,
	links: linksSliceReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware),
	devTools: true,
})

export const persistor = persistStore(store)
