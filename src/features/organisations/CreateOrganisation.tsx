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
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="[&>*]:mb-4">
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

export const CreateOrganisationModal = ({
	open,
	closeFn,
	refetchFn,
}: {
	open: boolean
	refetchFn?: () => void
	closeFn: () => void
}) => {
	const { theme } = useTheme()
	return createPortal(
		<div className={'modal ' + (open ? 'modal-open' : '')} data-theme={theme}>
			<div className="modal-box relative max-w-md overflow-visible bg-base-200">
				<button className="btn btn-square absolute -top-6 -right-6" onClick={closeFn}>
					<IoMdClose size="1.5em" />
				</button>
				<h1 className="mb-6 text-2xl font-bold text-primary">Create Organisation</h1>
				<CreateOrganisationForm closeFn={closeFn} refetchFn={refetchFn} />
			</div>
		</div>,
		document.getElementById('modal-root') as HTMLElement,
	)
}
