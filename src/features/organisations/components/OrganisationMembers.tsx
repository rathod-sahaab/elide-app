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
			<div className="card m-auto w-11/12 max-w-screen-sm bg-base-200 shadow-md">
				<div className="flex items-center justify-between p-4 text-sm font-bold uppercase opacity-70">
					<span>Member</span>
					<span>Role</span>
				</div>
				<div className="divider m-0 h-0 p-0"></div>
				{members &&
					(members as IOrganisationMemberRole[]).map((member, index) => {
						return (
							<>
								<div key={member.user.id} className="flex items-center justify-between p-4">
									<span className="font-bold">{member.user.name}</span>
									<ElideBadge variant="success">{member.role}</ElideBadge>
								</div>
								{index !== members.length - 1 && (
									<div
										className="divider m-0 h-0 p-0"
										key={`divider-${member.user.id}`}
									></div>
								)}
							</>
						)
					})}
			</div>
		</>
	)
}
