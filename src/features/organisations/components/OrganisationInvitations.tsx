import { useParams } from 'react-router-dom'
import { ElideBadge } from '../../../components/atoms/ElideBadge'
import {
	IOrganisationInvitation,
	useGetOrganisationInvitationsQuery,
	useGetOrganisationQuery,
} from '../orgnisationsApiSlice'

export const OrganisationInvitations = () => {
	const params = useParams()

	// FIXME: handle this error
	const organisationId = parseInt(params.organisationId || '0', 10)

	const { data: organisation, isLoading: organisationLoading } = useGetOrganisationQuery({
		id: organisationId,
	})

	const { data: invitations, isLoading: invitationsLoading } = useGetOrganisationInvitationsQuery({
		organisationId,
		offset: 0,
		limit: 10,
	})

	if (organisationLoading || invitationsLoading) {
		return <div>Loading...</div>
	}

	return (
		<>
			<div className="prose m-auto mb-12 text-center">
				<h1>{`${organisation.name}'s invitations`}</h1>
			</div>
			<div className="m-auto w-11/12 max-w-screen-sm">
				{invitations &&
					(invitations as IOrganisationInvitation[]).map((invitation) => {
						return (
							<div
								key={invitation.user.id}
								className="card flex flex-row items-center justify-between bg-base-200 p-6 shadow-md"
							>
								<span className="font-bold">{invitation.user.name}</span>
								<span className="grid grid-cols-2 gap-4">
									<ElideBadge variant="success">{invitation.role}</ElideBadge>
									<ElideBadge
										variant={
											invitation.status === 'PENDING' || invitation.status === 'CANCELED'
												? 'warning'
												: invitation.status === 'ACCEPTED'
												? 'success'
												: 'error'
										}
									>
										{invitation.status}
									</ElideBadge>
								</span>
							</div>
						)
					})}
			</div>
		</>
	)
}
