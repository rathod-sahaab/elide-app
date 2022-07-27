import { IoMdClose } from 'react-icons/io'
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

	return (
		<div>
			<p>Are you sure you want to delete this link?</p>
			<div className="flex items-center justify-between">
				<button
					className="btn btn-outline"
					disabled={isLoading}
					onClick={() => {
						if (closeFn) closeFn()
					}}
				>
					Cancel
				</button>
				<button
					className="btn btn-error"
					disabled={isLoading}
					onClick={() => handleDelete(link.id)}
				>
					Delete Link
				</button>
			</div>
		</div>
	)
}

export const DeleteLinkModal = ({
	open,
	...rest
}: {
	open: boolean
} & IDeleteLinkFormProps) => {
	return (
		<div className={'modal ' + (open ? 'modal-open' : '')}>
			<div className="modal-box relative max-w-md bg-base-200">
				<div className="flex items-center justify-between pb-6">
					<h1 className="text-2xl font-bold text-primary">Delete Link</h1>
					<button
						className="btn btn-circle btn-md"
						onClick={() => {
							if (rest.closeFn) rest.closeFn()
						}}
					>
						<IoMdClose size="1.5em" />
					</button>
				</div>
				<DeleteLinkForm {...rest} />
			</div>
		</div>
	)
}
