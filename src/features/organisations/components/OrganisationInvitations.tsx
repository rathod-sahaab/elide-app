import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { ElideBadge } from '../../../components/atoms/ElideBadge'
import {
	InvitationStatusType,
	INVITATION_STATUSES,
	IOrganisationInvitation,
	useGetOrganisationInvitationsQuery,
	useGetOrganisationQuery,
} from '../orgnisationsApiSlice'
import { OrganisationCancelInvitationModal } from './forms/CancelInvitationForm'
import { OrganisationInvitationModal } from './forms/InviteMemberForm'

import { IoPaperPlaneOutline } from 'react-icons/io5'

export const OrganisationInvitations = () => {
	const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
	const [invitationToBeCanceled, setInvitationToBeCaneled] =
		useState<IOrganisationInvitation | null>(null)
	const [invitaionModalOpen, setInvitationModalOpen] = useState(false)

	const [selectedStatus, setSelectedStatus] = useState<InvitationStatusType | undefined>('PENDING')

	const params = useParams()

	// FIXME: handle this error
	const organisationId = parseInt(params.organisationId || '0', 10)

	const { data: organisation, isLoading: organisationLoading } = useGetOrganisationQuery({
		id: organisationId,
	})

	const {
		data: invitations,
		isLoading: invitationsLoading,
		refetch,
	} = useGetOrganisationInvitationsQuery({
		organisationId,
		offset: 0,
		limit: 10,
		status: selectedStatus,
	})

	if (organisationLoading || invitationsLoading) {
		return <div>Loading...</div>
	}

	return (
		<>
			<OrganisationInvitationModal
				organisationId={organisationId}
				open={invitaionModalOpen}
				closeFn={() => setInvitationModalOpen(false)}
			/>
			<OrganisationCancelInvitationModal
				open={isCancelModalOpen}
				organisationId={organisationId}
				invitation={invitationToBeCanceled}
				closeFn={() => {
					setIsCancelModalOpen(false)
				}}
				refetchFn={refetch}
			/>
			<div className="prose m-auto mb-12 text-center">
				<h1>{`${organisation.name}'s invitations`}</h1>
				<button
					className="btn btn-ghost bg-base-200"
					onClick={() => setInvitationModalOpen(true)}
				>
					<IoPaperPlaneOutline size="1.35em" className="mr-2" /> Invite
				</button>
			</div>
			<div className="tabs-lg tabs tabs-boxed m-auto my-12 flex max-w-screen-sm justify-center">
				{INVITATION_STATUSES.map((status) => (
					<button
						key={status}
						className={'tab ' + (status === selectedStatus ? 'tab-active' : '')}
						onClick={() => status !== selectedStatus && setSelectedStatus(status)}
					>
						{status}
					</button>
				))}
				<button
					className={'tab ' + (selectedStatus === undefined ? 'tab-active' : '')}
					onClick={() => selectedStatus && setSelectedStatus(undefined)}
				>
					ALL
				</button>
			</div>
			<div className="card m-auto w-11/12 max-w-screen-sm shadow-md">
				{invitations &&
					(invitations as IOrganisationInvitation[]).map((invitation, index) => {
						const isPending = invitation.status === 'PENDING'
						const isAccepted = invitation.status === 'ACCEPTED'
						return (
							<div key={invitation.id}>
								<div className="flex items-center justify-between bg-base-200 p-4">
									<span className="font-bold">{invitation.user.name}</span>
									<span
										className={
											'grid gap-2 ' +
											(isPending
												? 'grid-cols-[auto_auto_auto]'
												: 'grid-cols-[auto_auto]')
										}
									>
										<ElideBadge variant="success">{invitation.role}</ElideBadge>
										<ElideBadge
											variant={isPending ? 'warning' : isAccepted ? 'success' : 'error'}
										>
											{invitation.status}
										</ElideBadge>
										{isPending && (
											<button
												className="btn btn-warning btn-square btn-sm"
												onClick={() => {
													setInvitationToBeCaneled(invitation)
													setIsCancelModalOpen(true)
												}}
											>
												<IoMdClose size="1.35em" />
											</button>
										)}
									</span>
								</div>
								{index < invitations.length - 1 ? (
									<div
										key={`divider-${invitation.id}`}
										className="divider m-0 h-0 p-0"
									></div>
								) : null}
							</div>
						)
					})}
			</div>
		</>
	)
}
