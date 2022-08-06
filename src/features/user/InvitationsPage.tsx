import { IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5'
import { APIError } from '../../commons/types'
import { ElideBadge } from '../../components/atoms/ElideBadge'
import {
	IUserInvitation,
	useAcceptInvitationMutation,
	useGetInvitationsQuery,
} from './userApiSlice'

const InvitationsList = ({
	invitations,
	refetchFn,
}: {
	invitations: IUserInvitation[]
	refetchFn?: () => void
}) => {
	const [acceptInvitation, { isLoading: isLoadingAccept }] = useAcceptInvitationMutation()
	const [rejectInvitation, { isLoading: isLoadingReject }] = useAcceptInvitationMutation()

	const handleAcceptInvitation = async (invitation: IUserInvitation) => {
		try {
			const response = await acceptInvitation({ id: invitation.id })
			if (refetchFn) refetchFn()
			console.log(response)
		} catch (err: any) {
			if (err.status) {
				const apiError = err.data as APIError
				console.error(apiError.statusCode, apiError.message)
			}
			return err
		}
	}

	const handleRejectInvitation = async (invitation: IUserInvitation) => {
		try {
			const response = await rejectInvitation({ id: invitation.id })
			if (refetchFn) refetchFn()
			console.log(response)
			console.log(response)
		} catch (err: any) {
			if (err.status) {
				const apiError = err.data as APIError
				console.error(apiError.statusCode, apiError.message)
			}
			return err
		}
	}

	return (
		<div className="card bg-base-200 shadow-md">
			<div className="grid grid-cols-3 p-4 px-6 text-sm font-bold uppercase opacity-70">
				<span>Organisation</span>
				<span className="justify-self-center">Role</span>
				<span className="justify-self-end">accept / reject</span>
			</div>
			<div className="divider m-0 h-0 p-0"></div>
			{invitations.map((invitation, index) => (
				<>
					<div key={invitation.id} className="grid grid-cols-3 p-4 px-6">
						<span className="font-bold">{invitation.organisation.name}</span>
						<span className="justify-self-center">
							<ElideBadge variant="success">{invitation.role}</ElideBadge>
						</span>
						<span className="justify-self-end">
							<button
								onClick={() => handleAcceptInvitation(invitation)}
								className={
									'btn btn-success btn-sm ' +
									(isLoadingAccept || isLoadingReject ? 'btn-disabled loading' : '')
								}
							>
								<IoMdCheckmark size="1.35em" />
							</button>
							<button
								onClick={() => handleRejectInvitation(invitation)}
								className={
									'btn btn-warning btn-sm ml-2 ' +
									(isLoadingAccept || isLoadingReject ? 'btn-disabled loading' : '')
								}
							>
								<IoMdClose size="1.35em" />
							</button>
						</span>
					</div>
					{index !== invitations.length - 1 && (
						<div className="divider m-0 h-0 p-0" key={`divider-${invitation.id}`}></div>
					)}
				</>
			))}
		</div>
	)
}

export const UserInvitations = () => {
	const {
		data: invitations,
		isLoading,
		refetch,
	} = useGetInvitationsQuery({ offset: 0, limit: 10 })

	return (
		<div className="m-auto max-w-screen-md p-6">
			<div className="prose mb-12  max-w-screen-md text-center">
				<h1>Your Invitations</h1>
			</div>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<InvitationsList invitations={invitations} refetchFn={refetch} />
			)}
		</div>
	)
}
