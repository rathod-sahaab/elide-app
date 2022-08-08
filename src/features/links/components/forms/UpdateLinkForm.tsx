import { ErrorInputWrapper } from '../../../../components/forms/ErrorInputWrapper'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ILink } from './../../linksSlice'
import { ILinkUpdateData, useUpdateLinkMutation } from './../../linksApiSlice'
import { selectOrganisation } from '../../../organisations/organisationsSlice'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/use-app-dispacth-selector'
import { selectActiveProject } from '../../../projects/projectsSlice'
import { ElideModal } from '../../../../components/ElideModal'

const schema = yup.object({
	url: yup.string().url('URL must be valid').required('URL is required'),
	active: yup.boolean().required('Active is required'),
	description: yup.string(),
})

export const UpdateLinkForm = ({
	closeFn,
	refetchFn,
}: {
	closeFn?: () => void
	refetchFn?: () => void
}) => {
	const [updateLink, { isLoading }] = useUpdateLinkMutation()
	const dispatch = useAppDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILinkUpdateData>({
		resolver: yupResolver(schema),
		defaultValues: {
			active: true,
		},
	})

	const submitHandler: SubmitHandler<ILinkUpdateData> = async (data) => {
		try {
			const createdLinkData: ILink = await updateLink({
				...data,
			}).unwrap()
			console.log(createdLinkData)
			if (closeFn) closeFn()
			if (refetchFn) refetchFn()
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			<div className="[&>*]:mb-4">
				<ErrorInputWrapper fieldError={errors.url}>
					<input
						disabled={isLoading}
						className="input block w-full bg-base-100"
						placeholder="URL"
						{...register('url')}
					/>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.description}>
					<textarea
						disabled={isLoading}
						className="textarea block w-full bg-base-100"
						placeholder="Description"
						{...register('description')}
					/>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.active}>
					<div className="flex flex-row items-center justify-between rounded-[var(--rounded-btn)] bg-base-100 p-3.5">
						<label className="text-base">Active</label>
						<input
							disabled={isLoading}
							className="toggle"
							placeholder="slug"
							type="checkbox"
							{...register('active')}
						/>
					</div>
				</ErrorInputWrapper>
				<button
					disabled={isLoading}
					className="btn btn-outline btn-ghost btn-block mt-4 text-center"
					onClick={handleSubmit(submitHandler)}
				>
					Create
				</button>
			</div>
		</div>
	)
}

export const UpdateLinkModal = ({
	open,
	closeFn,
	refetchFn,
}: {
	open: boolean
	refetchFn: () => void
	closeFn: () => void
}) => {
	return (
		<ElideModal open={open} closeFn={closeFn} title="Update Link">
			<UpdateLinkForm closeFn={closeFn} refetchFn={refetchFn} />
		</ElideModal>
	)
}
