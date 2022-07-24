import { ErrorInputWrapper } from '../../components/forms/ErrorInputWrapper'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { createLink } from './linksSlice'

type AddLinkInput = {
	slug: string
	url: string
	active: boolean
	description?: string
}

const schema = yup.object({
	slug: yup.string().required('Slug is required'),
	url: yup.string().url('URL must be valid').required('URL is required'),
	active: yup.boolean().required('Active is required'),
	description: yup.string(),
})

export const AddLinkForm = () => {
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddLinkInput>({
		resolver: yupResolver(schema),
		defaultValues: {
			active: true,
		},
	})

	const submitHandler: SubmitHandler<AddLinkInput> = async (data) => {
		console.log(data)
		dispatch(createLink(data))
	}
	return (
		<div>
			<div className="[&>*:not(:last-child)]:mb-6">
				<h1 className="text-xl font-bold px-2 pt-2">Add Link</h1>
				<ErrorInputWrapper fieldError={errors.slug}>
					<div className="input-group">
						<span className="font-bold">elide.in/</span>
						<input
							className="input w-full bg-base-100 block"
							placeholder="slug"
							{...register('slug')}
						/>
					</div>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.url}>
					<input
						className="input w-full bg-base-100 block"
						placeholder="URL"
						{...register('url')}
					/>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.description}>
					<input
						className="input w-full bg-base-100 block"
						placeholder="Description"
						{...register('description')}
					/>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.active}>
					<div className="flex items-center p-4 border border-base-300 rounded-xl justify-between">
						<label className="text-base">Active</label>
						<input
							className="toggle"
							placeholder="slug"
							type="checkbox"
							{...register('active')}
						/>
					</div>
				</ErrorInputWrapper>
				<button
					className="btn btn-block flex flex-nowrap items-center justify-between"
					onClick={handleSubmit(submitHandler)}
				>
					Add Link
				</button>
			</div>
		</div>
	)
}

export const AddLinkCard = () => {
	return (
		<div className="card bg-base-200 max-w-sm w-full shadow p-4">
			<AddLinkForm />
		</div>
	)
}
