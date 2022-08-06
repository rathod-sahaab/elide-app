import { IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { APIError } from '../../commons/types'
import { ElideBadge } from '../../components/atoms/ElideBadge'
import {
	IUserInvitation,
	useAcceptInvitationMutation,
	useGetInvitationsQuery,
	useRejectInvitationMutation,
} from './userApiSlice'

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

const InvitationsList = ({
	invitations,
	refetchFn,
}: {
	invitations: IUserInvitation[]
	refetchFn?: () => void
}) => {
	const [acceptInvitation, { isLoading: isLoadingAccept }] = useAcceptInvitationMutation()
	const [rejectInvitation, { isLoading: isLoadingReject }] = useRejectInvitationMutation()

	const handleInvitation =
		(apiFunction: typeof acceptInvitation | typeof rejectInvitation) =>
		async (invitation: IUserInvitation) => {
			try {
				const response = await apiFunction({ id: invitation.id })
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

	// TODO: Get reviewed
	const handleAcceptInvitation = handleInvitation(acceptInvitation)
	const handleRejectInvitation = handleInvitation(rejectInvitation)

	return (
		<div className="card bg-base-200 shadow-md">
			<div className="grid grid-cols-3 p-4 px-6 text-sm font-bold uppercase opacity-70">
				<span>Org #ID</span>
				<span className="justify-self-center">Role</span>
				<span className="justify-self-end">accept / reject</span>
			</div>
			{invitations.map((invitation) => (
				<>
					<div className="divider m-0 h-0 p-0" key={`divider-${invitation.id}`}></div>
					<InvitationRow
						key={invitation.id}
						isLoading={isLoadingAccept || isLoadingReject}
						invitation={invitation}
						handleAccept={() => handleAcceptInvitation(invitation)}
						handleReject={() => handleRejectInvitation(invitation)}
					/>
				</>
			))}
		</div>
	)
}

const InvitationRow = ({
	invitation,
	handleAccept,
	handleReject,
	isLoading,
}: {
	invitation: IUserInvitation
	handleAccept: () => void
	handleReject: () => void
	isLoading: boolean
}) => (
	<div key={invitation.id} className="grid grid-cols-3 p-4 px-6">
		<span className="font-bold">
			{invitation.organisation.name}{' '}
			<span className="font-normal italic opacity-50">#{invitation.organisation.id}</span>
		</span>
		<span className="justify-self-center">
			<ElideBadge variant="success">{invitation.role}</ElideBadge>
		</span>
		<span className="justify-self-end">
			<button
				onClick={() => handleAccept()}
				className={'btn btn-success btn-sm ' + (isLoading ? 'btn-disabled loading' : '')}
			>
				<IoMdCheckmark size="1.35em" />
			</button>
			<button
				onClick={() => handleReject()}
				className={'btn btn-warning btn-sm ml-2 ' + (isLoading ? 'btn-disabled loading' : '')}
			>
				<IoMdClose size="1.35em" />
			</button>
		</span>
	</div>
)
