import { ErrorInputWrapper } from '../../components/forms/ErrorInputWrapper'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createLink as createLinkActionCreator, ILink, ILinkData } from './linksSlice'
import { useCreateLinkMutation, useLazyGetSlugAvailabilityQuery } from './linksApiSlice'
import { useEffect, useState } from 'react'
import { selectOrganisation } from '../organisations/organisationsSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks/use-app-dispacth-selector'
import { selectActiveProject } from '../projects/projectsSlice'
import { ElideModal } from '../../components/ElideModal'
import { closeCreateLinkModal, uiSelectCreateLink } from '../../app/ui/uiSlice'
import { APIError } from '../../commons/types'
import { ElideErrorCard } from '../../components/ElideAlert'

const schema = yup.object({
	slug: yup.string().required('Slug is required'),
	url: yup.string().url('URL must be valid').required('URL is required'),
	active: yup.boolean().required('Active is required'),
	description: yup.string(),
})

export const AddLinkForm = () => {
	const activeOrganisation = useAppSelector(selectOrganisation)
	const activeProject = useAppSelector(selectActiveProject)

	const [createLink, { isLoading }] = useCreateLinkMutation()
	const [slugAvailabilityTrigger] = useLazyGetSlugAvailabilityQuery()
	const [slugAvailable, setSlugAvailable] = useState(false)
	const dispatch = useAppDispatch()

	const [error, setError] = useState('')

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILinkData>({
		resolver: yupResolver(schema),
		defaultValues: {
			active: true,
		},
	})

	const slug = watch('slug')

	const handleSlugChange = (slug: string) => {
		if (slug && slug !== '') {
			slugAvailabilityTrigger({ slug })
				.unwrap()
				.then(({ available }) => {
					setSlugAvailable(available)
				})
				.catch((err) => {
					console.log(err)
					setSlugAvailable(false)
				})
		}
	}

	// debounce
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			handleSlugChange(slug)
		}, 600)

		return () => clearTimeout(timeoutId)
	}, [slug])

	const submitHandler: SubmitHandler<ILinkData> = async (data) => {
		try {
			const createdLinkData: ILink = await createLink({
				...data,
				projectId: activeProject.project?.id,
				organisationId: activeOrganisation?.organisation?.id,
			}).unwrap()
			dispatch(createLinkActionCreator(createdLinkData))
			dispatch(closeCreateLinkModal())
		} catch (err: any) {
			if (err.status) {
				const apiErr = err.data as APIError
				setError(apiErr.message)
			}
			console.log(err)
		}
	}

	return (
		<div className="[&>*]:mb-4">
			{error && <ElideErrorCard>{error}</ElideErrorCard>}
			<ErrorInputWrapper
				fieldError={errors.slug}
				altComponent={
					slug !== '' && !slugAvailable ? (
						<span className="text-error">Unavailable</span>
					) : slug !== '' ? (
						<span className="text-success">Available</span>
					) : undefined
				}
			>
				<div className="input-group">
					<span className="font-bold">{import.meta.env.VITE_DOMAIN_NAME}/</span>
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
				disabled={isLoading || !slugAvailable}
				className="btn btn-outline btn-ghost btn-block mt-4 text-center"
				onClick={handleSubmit(submitHandler)}
			>
				Create
			</button>
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

export const AddLinkModal = () => {
	const open = useAppSelector(uiSelectCreateLink).createLinkModal
	const dispatch = useAppDispatch()

	return (
		<ElideModal
			title="Create Link"
			open={open}
			closeFn={() => {
				dispatch(closeCreateLinkModal())
			}}
		>
			<AddLinkForm />
		</ElideModal>
	)
}
