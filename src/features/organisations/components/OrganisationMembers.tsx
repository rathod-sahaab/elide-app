import { useState } from 'react'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { ElideBadge } from '../../../components/atoms/ElideBadge'
import {
	useGetOrganisationMembersQuery,
	useGetOrganisationQuery,
	IOrganisationMemberRole,
} from '../orgnisationsApiSlice'
import { OrganisationInvitationModal } from './forms/OrganisationInvitationForm'

export const OrganisationMembers = () => {
	const params = useParams()
	const [invitaionModalOpen, setInvitationModalOpen] = useState(false)

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
			<OrganisationInvitationModal
				organisationId={organisationId}
				open={invitaionModalOpen}
				closeFn={() => setInvitationModalOpen(false)}
			/>
			<div className="prose m-auto mb-12 text-center">
				<h1>{`${organisation.name}'s members`}</h1>
				<button
					className="btn btn-ghost bg-base-200"
					onClick={() => setInvitationModalOpen(true)}
				>
					<IoPaperPlaneOutline size="1.35em" className="mr-2" /> Invite
				</button>
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
