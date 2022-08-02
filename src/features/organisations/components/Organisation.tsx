import { NavLink, Outlet, useParams } from 'react-router-dom'

// TODO: use this
export interface OrganisationParams {
	organisationId: string
}

export const Organisation = () => {
	const params = useParams()

	// FIXME: handle this error
	const organisationId = parseInt(params.organisationId || '0', 10)

	return (
		<div>
			<div className="tabs-lg tabs tabs-boxed m-auto my-12 flex w-11/12 max-w-screen-sm justify-center">
				<NavLink
					to="members"
					className={({ isActive }) => 'tab ' + (isActive ? 'tab-active' : '')}
				>
					Members
				</NavLink>
				<NavLink
					to="invitations"
					className={({ isActive }) => 'tab ' + (isActive ? 'tab-active' : '')}
				>
					Invitations
				</NavLink>
			</div>
			<Outlet />
		</div>
	)
}
