import { ElideModal } from '../../../../components/ElideModal'
import { IOrganisationInvitation, useCancelInvitationMutation } from '../../orgnisationsApiSlice'

export const OrganisationCancelInvitationForm = ({
	invitation,
	organisationId,
	refetchFn,
	closeFn,
}: {
	invitation: IOrganisationInvitation | null
	organisationId: number
	refetchFn?: () => void
	closeFn?: () => void
}) => {
	const [cancelInvitation, { isLoading }] = useCancelInvitationMutation()

	const handleCancel = async () => {
		try {
			await cancelInvitation({ organisationId, invitationId: invitation!.id }).unwrap()
			if (refetchFn) refetchFn()
			if (closeFn) closeFn()
		} catch (err) {
			// TODO: handle error more gracefully
			console.log(err)
		}
	}
	if (!invitation) {
		return (
			<div className="alert alert-error">
				No Invitation to cancel. Some error occured please report T-T.
			</div>
		)
	}

	return (
		<div className="text-center">
			<p className="mb-6">
				Are you sure you want to cancel the <b>PENDING</b> invitation to{' '}
				<b>{invitation.user.name}</b> for the role of <b>{invitation.role}</b>?
			</p>
			<button
				className="btn btn-error"
				disabled={isLoading}
				onClick={() => {
					handleCancel()
				}}
			>
				Cancel Invitation
			</button>
		</div>
	)
}

export const OrganisationCancelInvitationModal = ({
	open,
	closeFn,
	refetchFn,
	organisationId,
	invitation,
}: {
	organisationId: number
	open: boolean
	refetchFn?: () => void
	closeFn: () => void
	invitation: IOrganisationInvitation | null
}) => {
	return (
		<ElideModal open={open} closeFn={closeFn} title="Cancel Ivitation">
			<OrganisationCancelInvitationForm
				closeFn={closeFn}
				refetchFn={refetchFn}
				organisationId={organisationId}
				invitation={invitation}
			/>
		</ElideModal>
	)
}
