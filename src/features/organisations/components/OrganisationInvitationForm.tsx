import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ErrorInputWrapper } from '../../../components/forms/ErrorInputWrapper'
import {
	IOrganisationData,
	IOrganisationInvitation,
	ROLES,
	RoleType,
	useSendInvitaionMutation,
} from '../orgnisationsApiSlice'
import { ElideModal } from '../../../components/ElideModal'

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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IInvitationFormData>({
		resolver: yupResolver(schema),
	})

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
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="[&>*]:mb-4">
			<ErrorInputWrapper fieldError={errors.email}>
				<input
					disabled={isLoading}
					className="input block w-full bg-base-100"
					placeholder="Member Email"
					{...register('email')}
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

export const OrganisationInvitationModal = ({
	open,
	closeFn,
	refetchFn,
	organisationId,
}: {
	organisationId: number
	open: boolean
	refetchFn?: () => void
	closeFn: () => void
}) => {
	return (
		<ElideModal open={open} closeFn={closeFn} title="Invite User">
			<OrganisationInvitationForm
				organisationId={organisationId}
				closeFn={closeFn}
				refetchFn={refetchFn}
			/>
		</ElideModal>
	)
}
