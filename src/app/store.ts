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
import { orgainsationSliceReducer } from '../features/organisations/organisationsSlice'
import { uiSliceReducer } from './ui/uiSlice'
import { projectsSliceReducer } from '../features/projects/projectsSlice'

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['auth', 'organisation', 'projects'],
}

const rootReducer = combineReducers({
	auth: authSliceReducer,
	links: linksSliceReducer,
	organisation: orgainsationSliceReducer,
	projects: projectsSliceReducer,
	ui: uiSliceReducer,
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
