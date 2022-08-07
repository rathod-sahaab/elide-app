import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ErrorInputWrapper } from '../../../../components/forms/ErrorInputWrapper'
import { useState } from 'react'
import { APIError } from '../../../../commons/types'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/use-app-dispacth-selector'
import { closeCreateProjectModal, uiSelectCreateProject } from '../../../../app/ui/uiSlice'
import { ElideModal } from '../../../../components/ElideModal'
import { IProjectCreationData, useCreateProjectMutation } from '../../projectsApiSlice'
import { selectOrganisation } from '../../../organisations/organisationsSlice'

const schema = yup.object({
	name: yup.string().required('Name is required'),
	description: yup.string(),
})

export const CreateProjectForm = ({
	closeFn,
	refetchFn,
}: {
	closeFn?: () => void
	refetchFn?: () => void
}) => {
	// get active organisation from application state
	const organisation = useAppSelector(selectOrganisation)

	const [createProject, { isLoading }] = useCreateProjectMutation()

	const [error, setError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IProjectCreationData>({
		resolver: yupResolver(schema),
	})

	const submitHandler: SubmitHandler<IProjectCreationData> = async ({ name, description }) => {
		try {
			const createdProject: any = await createProject({
				name,
				description: description !== '' ? description : undefined,
				organisationId: organisation.organisation?.id,
			}).unwrap()
			console.log(createdProject)
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

export const CreateProjectModal = ({ refetchFn }: { refetchFn?: () => void }) => {
	const open = useAppSelector(uiSelectCreateProject)
	const dispatch = useAppDispatch()

	return (
		<ElideModal
			open={open}
			closeFn={() => dispatch(closeCreateProjectModal())}
			title="Create Project"
		>
			<CreateProjectForm
				closeFn={() => dispatch(closeCreateProjectModal())}
				refetchFn={refetchFn}
			/>
		</ElideModal>
	)
}
