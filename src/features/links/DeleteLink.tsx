import { createPortal } from 'react-dom'
import { IoMdClose } from 'react-icons/io'
import { useTheme } from '../../app/hooks/use-theme'
import { useDeleteLinkMutation } from './linksApiSlice'
import { ILink } from './linksSlice'

interface IDeleteLinkFormProps {
	link: ILink | null
	refetchFn?: () => void
	closeFn?: () => void
}

export const DeleteLinkForm = ({ link, closeFn, refetchFn }: IDeleteLinkFormProps) => {
	const [deleteLink, { isLoading }] = useDeleteLinkMutation()

	const handleDelete = async (id: number) => {
		try {
			await deleteLink({ id }).unwrap()
			if (refetchFn) refetchFn()
			if (closeFn) closeFn()
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
				Delete Link
			</button>
		</div>
	)
}

export const DeleteLinkModal = ({
	open,
	...rest
}: {
	open: boolean
} & IDeleteLinkFormProps) => {
	const { theme } = useTheme()
	return createPortal(
		<div className={'modal ' + (open ? 'modal-open' : '')} data-theme={theme}>
			<div className="modal-box relative max-w-md overflow-visible bg-base-200">
				<button
					className="btn btn-square absolute -top-6 -right-6"
					onClick={() => {
						if (rest.closeFn) rest.closeFn()
					}}
				>
					<IoMdClose size="1.5em" />
				</button>
				<h1 className="pb-6 text-2xl font-bold text-primary">Delete Link</h1>
				<DeleteLinkForm {...rest} />
			</div>
		</div>,
		document.getElementById('modal-root') as HTMLElement,
	)
}
