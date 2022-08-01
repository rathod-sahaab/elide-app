import { useParams } from 'react-router-dom'
import { useGetOrganisationMembersQuery } from '../orgnisationsApiSlice'

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

export const ElideBadge = ({ children }: React.PropsWithChildren) => {
	return <span className="btn btn-success btn-sm no-animation opacity-70">{children}</span>
}

export const Organisation = () => {
	const params = useParams()

	// FIXME: handle this error
	const organisationId = parseInt(params.organisationId || '0', 10)

	const { data: members, isLoading } = useGetOrganisationMembersQuery({
		organisationId,
		offset: 0,
		limit: 10,
	})

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<div className="prose m-auto mb-12">
				<h1 className="text-center">
					{organisationId}
					{"'"}s Members
				</h1>
			</div>
			<div className="m-auto w-11/12 max-w-screen-sm">
				{members &&
					(members as IOrganisationMemberRole[]).map((member) => {
						return (
							<div
								key={member.user.id}
								className="card flex flex-row items-center justify-between bg-base-200 p-6 shadow-md"
							>
								<span className="font-bold">{member.user.name}</span>
								<span>
									<ElideBadge>{member.role}</ElideBadge>
								</span>
							</div>
						)
					})}
			</div>
		</div>
	)
}
