import { Route, Routes } from 'react-router-dom'
import Layout, { OutletLayout } from './components/Layout'
import { Public } from './components/Public'
import { Dashboard } from './features/auth/Dashboard'
import { LoginPage } from './features/auth/Login'
import { RegisterPage } from './features/auth/Register'
import { RequireAuth } from './features/auth/RequireAuth'

function App() {
	return (
		<Routes>
			<Route path="/" element={<OutletLayout />}>
				{/*Public routes*/}
				<Route index element={<Public />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />

				{/*Protected Routes*/}
				<Route element={<RequireAuth />}>
					<Route path="dashboard" element={<Dashboard />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default App
