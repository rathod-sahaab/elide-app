import { NavLink, Outlet, useParams } from 'react-router-dom'

export interface IOrganisationMemberRole {
	role: string
	user: {
		name: string
		id: number
	}
}

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
			<div className="tabs-lg tabs tabs-boxed m-auto flex w-11/12 max-w-screen-sm justify-center my-12">
				<NavLink
					to="members"
					className={({ isActive }) => 'tab ' + (isActive ? 'tab-active' : '')}
				>
					Members
				</NavLink>
				<NavLink
					to="invites"
					className={({ isActive }) => 'tab ' + (isActive ? 'tab-active' : '')}
				>
					Invites
				</NavLink>
			</div>
			<Outlet />
		</div>
	)
}
