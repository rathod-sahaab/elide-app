import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { Dashboard } from './pages/dashboard'
import { Profile } from './pages/profile'

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/dashboard" element={<Dashboard />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
			</Routes>
		</Layout>
	)
}

export default App
