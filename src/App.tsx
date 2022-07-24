import { Route, Routes } from 'react-router-dom'
import { OutletLayout } from './components/Layout'
import { Public } from './components/Public'
import { Dashboard } from './components/pages/Dashboard'
import { LoginPage } from './features/auth/Login'
import { RegisterPage } from './features/auth/Register'
import { RequireAuth, RequireNoAuth } from './features/auth/RequireAuth'

function App() {
	return (
		<Routes>
			<Route path="/" element={<OutletLayout />}>
				{/*General routes*/}
				<Route index element={<Public />} />

				{/*Unauthenticated Routes*/}
				<Route element={<RequireNoAuth />}>
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
				</Route>

				{/*Authehticated Routes*/}
				<Route element={<RequireAuth />}>
					<Route path="dashboard" element={<Dashboard />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default App
