import { useParams } from 'react-router-dom'
import { ElideBadge } from '../../../components/atoms/ElideBadge'
import {
	useGetOrganisationMembersQuery,
	useGetOrganisationQuery,
	IOrganisationMemberRole,
} from '../orgnisationsApiSlice'

export const OrganisationMembers = () => {
	const params = useParams()
	// FIXME: handle this error
	const organisationId = parseInt(params.organisationId || '0', 10)

	const { data: organisation, isLoading: organisationLoading } = useGetOrganisationQuery({
		id: organisationId,
	})

	const { data: members, isLoading: membersLoading } = useGetOrganisationMembersQuery({
		organisationId,
		offset: 0,
		limit: 10,
	})

	if (membersLoading || organisationLoading) {
		return <div>Loading...</div>
	}
	return (
		<>
			<div className="prose m-auto mb-12 text-center">
				<h1>{`${organisation.name}'s members`}</h1>
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
								<ElideBadge variant="success">{member.role}</ElideBadge>
							</div>
						)
					})}
			</div>
		</>
	)
}
