import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './hooks/use-theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<BrowserRouter>
						<Routes>
							<Route path="/*" element={<App />} />
						</Routes>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
)
