import { Outlet } from 'react-router-dom'
import { useTheme } from '../app/hooks/use-theme'
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
				<NoSidebarLayout fixedNavbar={false}>{children}</NoSidebarLayout>
			</Sidebar>
		</>
	)
}

export const NoSidebarLayout = ({
	children,
	fixedNavbar = true,
}: React.PropsWithChildren & { fixedNavbar?: boolean }) => {
	return (
		<>
			<Navbar fixed={fixedNavbar} />
			<main className="h-full overflow-y-auto">{children}</main>
		</>
	)
}
