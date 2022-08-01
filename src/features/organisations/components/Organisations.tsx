import { Link } from 'react-router-dom'
import { IOrganisationRole, useGetOrganisationsQuery } from '../orgnisationsApiSlice'

export const Organisations = () => {
	const { data: orgRoles, isLoading } = useGetOrganisationsQuery({})

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className="m-auto max-w-screen-lg">
			<h1 className="p-6 text-center text-2xl font-bold">Your Organisations</h1>
			<table className="table w-full">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Description</th>
						<th>Role</th>
					</tr>
				</thead>
				<tbody>
					{orgRoles &&
						(orgRoles as IOrganisationRole[]).map((orgRole) => {
							const { organisation, role } = orgRole
							return (
								<tr key={organisation.id}>
									<td>
										<Link
											to={`/organisation/${organisation.id}`}
											className="inline-block w-full hover:link"
										>
											{organisation.id}
										</Link>
									</td>
									<td>
										<Link
											to={`/organisation/${organisation.id}`}
											className="inline-block w-full hover:link"
										>
											{organisation.name}
										</Link>
									</td>
									<td className="overflow-hidden">
										{organisation.description || (
											<span className="italic opacity-50">No description</span>
										)}
									</td>
									<td>
										<span className="badge">{role}</span>
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</div>
	)
}
