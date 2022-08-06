import { Link } from 'react-router-dom'
import { ElideBadge } from '../../../components/atoms/ElideBadge'
import { IOrganisationRole, useGetOrganisationsQuery } from '../orgnisationsApiSlice'

export const Organisations = () => {
	const { data: orgRoles, isLoading } = useGetOrganisationsQuery({})

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className="m-auto max-w-screen-lg">
			<div className="prose m-auto mb-12 text-center">
				<h1>Your Organisations</h1>
			</div>
			<div className="card bg-base-200 shadow-md">
				<div className="grid grid-cols-3 p-4 px-6 text-sm font-bold uppercase opacity-70">
					<span>Name #ID</span>
					<span className="justify-self-center">Description</span>
					<span className="justify-self-end">Role</span>
				</div>
				{orgRoles &&
					orgRoles.map((orgRole: IOrganisationRole) => (
						<>
							<div
								className="divider m-0 h-0 p-0"
								key={`divider-${orgRole.organisation.id}`}
							></div>
							<OrgRoleRow orgRole={orgRole} />
						</>
					))}
			</div>
		</div>
	)
}

const OrgRoleRow = ({ orgRole }: { orgRole: IOrganisationRole }) => {
	return (
		<div className="grid grid-cols-3 p-4 px-6">
			<Link to={`/organisations/${orgRole.organisation.id}`} className="font-bold hover:link">
				{orgRole.organisation.name}{' '}
				<span className="font-normal italic opacity-50">#{orgRole.organisation.id}</span>
			</Link>
			<span className="justify-self-center overflow-hidden whitespace-nowrap">
				{orgRole.organisation.description}
			</span>
			<span className="justify-self-end">
				<ElideBadge variant="success">{orgRole.role}</ElideBadge>
			</span>
		</div>
	)
}
