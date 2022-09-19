import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ErrorInputWrapper } from '../../../../components/forms/ErrorInputWrapper'
import {
	IOrganisationInvitation,
	ROLES,
	RoleType,
	useSendInvitaionMutation,
} from '../../orgnisationsApiSlice'
import { ElideModal } from '../../../../components/ElideModal'
import { APIError } from '../../../../commons/types'
import { useEffect, useState } from 'react'
import { ElideErrorCard } from '../../../../components/ElideAlert'
import { closeInviteMemberModal, uiSelectInviteMember } from '../../../../app/ui/uiSlice'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/use-app-dispacth-selector'

export interface IInvitationFormData {
	email: string
	role: RoleType
}

const schema = yup.object({
	email: yup.string().required('Email is required').email('Email should be valid'),
	role: yup.string().required('Role is required'),
})

export const OrganisationInvitationForm = ({
	closeFn,
	refetchFn,
	organisationId,
}: {
	organisationId: number
	closeFn?: () => void
	refetchFn?: () => void
}) => {
	const [sendInvitation, { isLoading }] = useSendInvitaionMutation()

	const [error, setError] = useState<string | null>(null)

	const open = useAppSelector(uiSelectInviteMember).modal

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IInvitationFormData>({
		resolver: yupResolver(schema),
	})

	useEffect(() => {
		reset({
			email: '',
		})
	}, [open])

	const submitHandler: SubmitHandler<IInvitationFormData> = async (data) => {
		try {
			const createdOrganisation: IOrganisationInvitation = await sendInvitation({
				organisationId,
				memberEmail: data.email,
				role: data.role,
			}).unwrap()
			console.log(createdOrganisation)
			if (closeFn) closeFn()
			if (refetchFn) refetchFn()
		} catch (err: any) {
			if (err.status) {
				const apiError = err.data as APIError
				setError(apiError.message)
			} else {
				console.log(err)
			}
		}
	}

	return (
		<div className="[&>*]:mb-4">
			{error && <ElideErrorCard>{error}</ElideErrorCard>}
			<ErrorInputWrapper fieldError={errors.email}>
				<input
					disabled={isLoading}
					className="input block w-full bg-base-100"
					placeholder="Member Email"
					{...register('email')}
					onChange={() => {
						setError(null)
					}}
				/>
			</ErrorInputWrapper>
			<ErrorInputWrapper fieldError={errors.role}>
				<select className="select font-normal" {...register('role')} defaultValue="">
					<option disabled value="">
						Select role for user
					</option>
					{ROLES.map((role) => (
						<option value={role} key={role}>
							{role}
						</option>
					))}
				</select>
			</ErrorInputWrapper>
			<button
				className="btn btn-outline btn-ghost btn-block mt-4 text-center"
				onClick={handleSubmit(submitHandler)}
			>
				Create
			</button>
		</div>
	)
}

export const OrganisationInvitationModal = ({ organisationId }: { organisationId: number }) => {
	const open = useAppSelector(uiSelectInviteMember).modal
	const dispatch = useAppDispatch()
	return (
		<ElideModal
			open={open}
			closeFn={() => {
				dispatch(closeInviteMemberModal())
			}}
			title="Invite User"
		>
			<OrganisationInvitationForm organisationId={organisationId} />
		</ElideModal>
	)
}
