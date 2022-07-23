import { Outlet } from 'react-router-dom'
import ThemeProvider, { useTheme } from '../hooks/use-theme'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const ThemedLayout = ({ children }: React.PropsWithChildren) => {
	const { theme } = useTheme()

	return (
		<div data-theme={theme}>
			<Sidebar>
				<Navbar />
				<main>{children}</main>
			</Sidebar>
		</div>
	)
}

export const OutletLayout = () => {
	return <Outlet />
}

export const AuthLayout = ({ children }: React.PropsWithChildren) => {
	return (
		<ThemeProvider>
			<ThemedLayout>{children}</ThemedLayout>
		</ThemeProvider>
	)
}
