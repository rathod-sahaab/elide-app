import { useParams } from 'react-router-dom'
import { ElideBadge } from '../../../components/atoms/ElideBadge'
import { useGetOrganisationMembersQuery } from '../orgnisationsApiSlice'
import { IOrganisationMemberRole } from './Organisation'

export const OrganisationMembers = () => {
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
		<>
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
		</>
	)
}
