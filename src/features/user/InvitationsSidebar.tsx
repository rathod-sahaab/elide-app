import { IoMailUnreadSharp } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { useGetInvitationCountQuery } from './userApiSlice'

export const InvitationsSidebar = () => {
	const { data, isLoading, error } = useGetInvitationCountQuery({}, { pollingInterval: 10000 })

	if (isLoading) {
		return (
			<li>
				<div>Loading...</div>
			</li>
		)
	}

	if (error) {
		return (
			<li>
				<div>Invitations: ERROR</div>
			</li>
		)
	}

	if (!data || data.count === 0) {
		return null
	}

	return (
		<li>
			<NavLink to="/invitations">
				<IoMailUnreadSharp /> Invitations
				<span className="badge indicator-item badge-secondary">{data.count}</span>
			</NavLink>
		</li>
	)
}
