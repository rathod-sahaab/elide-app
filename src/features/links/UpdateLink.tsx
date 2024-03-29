import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../app/hooks/use-app-dispacth-selector'
import { closeUpdateLinkModal, uiSelectUpdateLink } from '../../app/ui/uiSlice'
import { ElideModal } from '../../components/ElideModal'
import { ErrorInputWrapper } from '../../components/forms/ErrorInputWrapper'
import { ILinkUpdateData, useLazyGetLinkQuery, useUpdateLinkMutation } from './linksApiSlice'
import { ILink, linksUpdateLink } from './linksSlice'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { APIError } from '../../commons/types'
import { ElideErrorCard } from '../../components/ElideAlert'

const schema = yup.object({
	url: yup.string().url('URL must be valid').required('URL is required'),
	active: yup.boolean().required('Active is required'),
	description: yup.string(),
})

export const UpdateLinkForm = () => {
	const linkId = useAppSelector(uiSelectUpdateLink).linkId
	const dispatch = useAppDispatch()

	const [getLinkTrigger] = useLazyGetLinkQuery()
	const [updateLink, { isLoading }] = useUpdateLinkMutation()

	const [error, setError] = useState('')

	useEffect(() => {
		setError('')
	}, [linkId])

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ILinkUpdateData>({
		resolver: yupResolver(schema),
	})

	const submitHandler: SubmitHandler<ILinkUpdateData> = async (data) => {
		try {
			const updatedLink: ILink = await updateLink({
				id: linkId!,
				...data,
			}).unwrap()
			dispatch(linksUpdateLink(updatedLink))
			dispatch(closeUpdateLinkModal())
		} catch (err: any) {
			if (err.status) {
				const apiErr = err.data as APIError
				setError(apiErr.message)
			}
			console.log(err)
		}
	}

	useEffect(() => {
		try {
			if (linkId) {
				getLinkTrigger({ id: linkId })
					.unwrap()
					.then((linkData: ILink) => {
						reset(linkData)
					})
			} else {
				throw new Error('This should not have happend')
			}
		} catch (err) {}
	}, [linkId])

	return (
		<div className="[&>*]:mb-4">
			{error && <ElideErrorCard>{error}</ElideErrorCard>}
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
				update
			</button>
		</div>
	)
}

export const UpdateLinkModal = () => {
	const open = useAppSelector(uiSelectUpdateLink).updateLinkModal
	const dispatch = useAppDispatch()

	return (
		<ElideModal
			title="Update Link"
			open={open}
			closeFn={() => {
				dispatch(closeUpdateLinkModal())
			}}
		>
			<UpdateLinkForm />
		</ElideModal>
	)
}
