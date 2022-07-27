import { ErrorInputWrapper } from '../../components/forms/ErrorInputWrapper'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { createLink as createLinkActionCreator, ILink, ILinkData } from './linksSlice'
import { useCreateLinkMutation } from './linksApiSlice'
import { IoMdClose } from 'react-icons/io'

const schema = yup.object({
	slug: yup.string().required('Slug is required'),
	url: yup.string().url('URL must be valid').required('URL is required'),
	active: yup.boolean().required('Active is required'),
	description: yup.string(),
})

export const AddLinkForm = ({
	closeFn,
	refetchFn,
}: {
	closeFn?: () => void
	refetchFn?: () => void
}) => {
	const [createLink, { isLoading }] = useCreateLinkMutation()
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILinkData>({
		resolver: yupResolver(schema),
		defaultValues: {
			active: true,
		},
	})

	const submitHandler: SubmitHandler<ILinkData> = async (data) => {
		try {
			const createdLinkData: ILink = await createLink({ ...data }).unwrap()
			console.log(createdLinkData)
			dispatch(createLinkActionCreator(createdLinkData))
			if (closeFn) closeFn()
			if (refetchFn) refetchFn()
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			<div className="[&>*:not(:last-child)]:mb-6">
				<ErrorInputWrapper fieldError={errors.slug}>
					<div className="input-group">
						<span className="font-bold">elide.in/</span>
						<input
							disabled={isLoading}
							className="input block w-full bg-base-100"
							placeholder="slug"
							{...register('slug')}
						/>
					</div>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.url}>
					<input
						disabled={isLoading}
						className="input block w-full bg-base-100"
						placeholder="URL"
						{...register('url')}
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
				<ErrorInputWrapper fieldError={errors.active}>
					<div className="flex items-center justify-between rounded-xl border border-base-300 p-4">
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
					className="btn btn-outline btn-ghost btn-block text-center"
					onClick={handleSubmit(submitHandler)}
				>
					Create
				</button>
			</div>
		</div>
	)
}

export const AddLinkCard = () => {
	return (
		<div className="card w-full max-w-md bg-base-200 p-4 shadow">
			<AddLinkForm />
		</div>
	)
}

export const AddLinkModal = ({
	open,
	closeFn,
	refetchFn,
}: {
	open: boolean
	refetchFn: () => void
	closeFn: () => void
}) => {
	return (
		<div className={'modal ' + (open ? 'modal-open' : '')}>
			<div className="modal-box relative max-w-md bg-base-200">
				<div className="flex items-center justify-between pb-6">
					<h1 className="text-2xl font-bold text-primary">Create Link</h1>
					<button className="btn btn-circle btn-md" onClick={closeFn}>
						<IoMdClose size="1.5em" />
					</button>
				</div>
				<AddLinkForm closeFn={closeFn} refetchFn={refetchFn} />
			</div>
		</div>
	)
}
