import { yupResolver } from '@hookform/resolvers/yup'
import { createPortal } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io'
import * as yup from 'yup'
import { ErrorInputWrapper } from '../../components/forms/ErrorInputWrapper'
import { useTheme } from '../../app/hooks/use-theme'
import {
	IOrganisation,
	IOrganisationData,
	useCreateOrganisationMutation,
} from './orgnisationsApiSlice'
import { useEffect, useState } from 'react'
import { APIError } from '../../commons/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks/use-app-dispacth-selector'
import { closeCreateOrganisationModal, uiSelectCreateOrganisation } from '../../app/ui/uiSlice'
import { ElideModal } from '../../components/ElideModal'

const schema = yup.object({
	name: yup.string().required('Name is required'),
	description: yup.string().required('Description is required'),
})

export const CreateOrganisationForm = ({
	closeFn,
	refetchFn,
}: {
	closeFn?: () => void
	refetchFn?: () => void
}) => {
	const [createOrganisation, { isLoading }] = useCreateOrganisationMutation()

	const [error, setError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IOrganisationData>({
		resolver: yupResolver(schema),
	})

	const submitHandler: SubmitHandler<IOrganisationData> = async (data) => {
		try {
			const createdOrganisation: IOrganisation = await createOrganisation({ ...data }).unwrap()
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
			{error && <div className="alert alert-error">{error}</div>}
			<ErrorInputWrapper fieldError={errors.name}>
				<input
					disabled={isLoading}
					className="input block w-full bg-base-100"
					placeholder="Name"
					{...register('name')}
				/>
			</ErrorInputWrapper>
			<ErrorInputWrapper fieldError={errors.description}>
				<input
					disabled={isLoading}
					className="input block w-full bg-base-100"
					placeholder="Description"
					{...register('description')}
				/>
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

export const CreateOrganisationModal = ({ refetchFn }: { refetchFn?: () => void }) => {
	const open = useAppSelector(uiSelectCreateOrganisation)
	const dispatch = useAppDispatch()

	return (
		<ElideModal
			open={open}
			closeFn={() => dispatch(closeCreateOrganisationModal())}
			title="Create Organisation"
		>
			<CreateOrganisationForm
				closeFn={() => dispatch(closeCreateOrganisationModal())}
				refetchFn={refetchFn}
			/>
		</ElideModal>
	)
}
