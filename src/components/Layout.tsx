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

const Layout = ({ children }: React.PropsWithChildren) => {
	return (
		<ThemeProvider>
			<ThemedLayout>{children}</ThemedLayout>
		</ThemeProvider>
	)
}

export default Layout
