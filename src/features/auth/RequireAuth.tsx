import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthLayout, NoSidebarLayout } from '../../components/Layout'
import { selectCurrentToken } from './authSlice'

export const RequireAuth = () => {
	const token = useSelector(selectCurrentToken)
	const location = useLocation()

	return token ? (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
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
