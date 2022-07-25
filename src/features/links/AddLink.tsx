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

export const AddLinkForm = ({ closeFn }: { closeFn?: () => void }) => {
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
							className="input w-full bg-base-100 block"
							placeholder="slug"
							{...register('slug')}
						/>
					</div>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.url}>
					<input
						disabled={isLoading}
						className="input w-full bg-base-100 block"
						placeholder="URL"
						{...register('url')}
					/>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.description}>
					<input
						disabled={isLoading}
						className="input w-full bg-base-100 block"
						placeholder="Description"
						{...register('description')}
					/>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.active}>
					<div className="flex items-center p-4 border border-base-300 rounded-xl justify-between">
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
					className="btn btn-ghost btn-outline btn-block text-center"
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
		<div className="card bg-base-200 max-w-md w-full shadow p-4">
			<AddLinkForm />
		</div>
	)
}

export const AddLinkModal = ({ open, closeFn }: { open: boolean; closeFn: () => void }) => {
	return (
		<div className={'modal ' + (open ? 'modal-open' : '')}>
			<div className="modal-box max-w-md relative bg-base-200">
				<div className="flex items-center justify-between pb-6">
					<h1 className="text-2xl font-bold text-primary">Create Link</h1>
					<button className="btn btn-circle btn-md" onClick={closeFn}>
						<IoMdClose size="1.5em" />
					</button>
				</div>
				<AddLinkForm closeFn={closeFn} />
			</div>
		</div>
	)
}
