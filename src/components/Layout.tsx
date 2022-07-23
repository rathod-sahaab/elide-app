import { Outlet } from 'react-router-dom'
import ThemeProvider, { useTheme } from '../hooks/use-theme'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export const OutletLayout = () => {
	const { theme } = useTheme()
	return (
		<div data-theme={theme}>
			<Outlet />
		</div>
	)
}

export const AuthLayout = ({ children }: React.PropsWithChildren) => {
	return (
		<>
			<Sidebar>
				<Navbar />
				<main>{children}</main>
			</Sidebar>
		</>
	)
}
