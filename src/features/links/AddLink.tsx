import { ErrorInputWrapper } from '../../components/forms/ErrorInputWrapper'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createLink as createLinkActionCreator, ILink, ILinkData } from './linksSlice'
import { useCreateLinkMutation, useLazyGetSlugAvailabilityQuery } from './linksApiSlice'
import { IoMdClose } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../../app/hooks/use-theme'
import { selectOrganisation } from '../organisations/organisationsSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks/use-app-dispacth-selector'
import { selectActiveProject } from '../projects/projectsSlice'

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
	const activeOrganisation = useAppSelector(selectOrganisation)
	const activeProject = useAppSelector(selectActiveProject)

	const [createLink, { isLoading }] = useCreateLinkMutation()
	const [slugAvailabilityTrigger] = useLazyGetSlugAvailabilityQuery()
	const [slugAvailable, setSlugAvailable] = useState(false)
	const dispatch = useAppDispatch()

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
			<div className="[&>*]:mb-4">
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
	const { theme } = useTheme()
	return createPortal(
		<div className={'modal ' + (open ? 'modal-open' : '')} data-theme={theme}>
			<div className="modal-box relative max-w-md overflow-visible bg-base-200">
				<button className="btn btn-square absolute -top-6 -right-6" onClick={closeFn}>
					<IoMdClose size="1.5em" />
				</button>
				<h1 className="mb-6 text-2xl font-bold text-primary">Create Link</h1>
				<AddLinkForm closeFn={closeFn} refetchFn={refetchFn} />
			</div>
		</div>,
		document.getElementById('modal-root') as HTMLElement,
	)
}
