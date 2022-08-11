import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks/use-app-dispacth-selector'
import { SidebarLayout, NoSidebarLayout } from '../../components/Layout'
import { selectCurrentToken, selectCurrentUser } from './authSlice'

export const RequireAuth = () => {
	const token = useSelector(selectCurrentToken)
	const location = useLocation()

	return token ? (
		<SidebarLayout>
			<Outlet />
		</SidebarLayout>
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	)
}

export const RequireNoAuth = () => {
	const token = useSelector(selectCurrentToken)
	const location = useLocation()

	return token ? (
		<Navigate to="/dashboard" state={{ from: location }} />
	) : (
		<NoSidebarLayout>
			<Outlet />
		</NoSidebarLayout>
	)
}

export const AdaptAuth = () => {
	const user = useAppSelector(selectCurrentUser)

	return user ? (
		<SidebarLayout>
			<Outlet />
		</SidebarLayout>
	) : (
		<NoSidebarLayout>
			<Outlet />
		</NoSidebarLayout>
	)
}
