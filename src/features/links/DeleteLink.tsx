import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks/use-app-dispacth-selector'
import { closeDeleteLinkModal, uiSelectDeleteLink } from '../../app/ui/uiSlice'
import { APIError } from '../../commons/types'
import { ElideErrorCard } from '../../components/ElideAlert'
import { ElideModal } from '../../components/ElideModal'
import { useDeleteLinkMutation } from './linksApiSlice'
import { linksRemoveLinks } from './linksSlice'

export const DeleteLinkForm = () => {
	const link = useAppSelector(uiSelectDeleteLink).link
	const [deleteLink, { isLoading }] = useDeleteLinkMutation()

	const [error, setError] = useState('')

	useEffect(() => {
		setError('')
	}, [link])

	const dispatch = useAppDispatch()

	const handleDelete = async (id: number) => {
		try {
			await deleteLink({ id }).unwrap()
			dispatch(linksRemoveLinks({ id }))
			dispatch(closeDeleteLinkModal())
		} catch (err: any) {
			if (err.status) {
				const apiErr = err.data as APIError
				setError(apiErr.message)
			}
			console.log(err)
		}
	}
	if (!link) {
		return <div className="alert alert-error">Some error occured!</div>
	}

	return (
		<>
			{error && <ElideErrorCard>{error}</ElideErrorCard>}
			<div className="text-center">
				<p className="my-6">
					Are you sure you want to delete link <b>elide.in/{link.slug}</b> pointing to{' '}
					<a href={link.url} className="link" target="_blank">
						{link.url}
					</a>
					?
				</p>
				<button
					className="btn btn-error"
					disabled={isLoading}
					onClick={() => {
						if (link) handleDelete(link.id)
					}}
				>
					Delete
				</button>
			</div>
		</>
	)
}

export const DeleteLinkModal = () => {
	const open = useAppSelector(uiSelectDeleteLink).deleteLinkModal
	const dispatch = useAppDispatch()

	return (
		<ElideModal
			open={open}
			closeFn={() => {
				dispatch(closeDeleteLinkModal())
			}}
			title="Delete Link"
		>
			<DeleteLinkForm />
		</ElideModal>
	)
}
