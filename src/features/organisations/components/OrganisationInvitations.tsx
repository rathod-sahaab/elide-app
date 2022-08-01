import { useParams } from 'react-router-dom'
import { ElideBadge } from '../../../components/atoms/ElideBadge'
import {
	IOrganisationInvitation,
	useGetOrganisationInvitationsQuery,
} from '../orgnisationsApiSlice'

export const OrganisationInvitations = () => {
	const params = useParams()

	// FIXME: handle this error
	const organisationId = parseInt(params.organisationId || '0', 10)

	const { data: invitations, isLoading } = useGetOrganisationInvitationsQuery({
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
					{"'"}s Invitations
				</h1>
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
								<ElideBadge>{invitation.role}</ElideBadge>
								<ElideBadge>{invitation.status}</ElideBadge>
							</div>
						)
					})}
			</div>
		</>
	)
}
