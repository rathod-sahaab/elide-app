import { useAppDispatch, useAppSelector } from '../../app/hooks/use-app-dispacth-selector'
import { closeDeleteLinkModal, uiSelectDeleteLink } from '../../app/ui/uiSlice'
import { ElideModal } from '../../components/ElideModal'
import { useDeleteLinkMutation } from './linksApiSlice'
import { linksRemoveLinks } from './linksSlice'

export const DeleteLinkForm = () => {
	const link = useAppSelector(uiSelectDeleteLink).link
	const [deleteLink, { isLoading }] = useDeleteLinkMutation()

	const dispatch = useAppDispatch()

	const handleDelete = async (id: number) => {
		try {
			await deleteLink({ id }).unwrap()
			dispatch(linksRemoveLinks({ id }))
			dispatch(closeDeleteLinkModal())
		} catch (err) {
			console.error(err)
		}
	}
	if (!link) {
		return <div className="alert alert-error">Some error occured!</div>
	}

	return (
		<div className="text-center">
			<p className="mb-6">
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
