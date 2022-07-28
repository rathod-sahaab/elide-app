import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { IoQrCodeOutline, IoTrashBin, IoTrashOutline } from 'react-icons/io5'
import { AddLinkModal } from './AddLink'
import { DeleteLinkModal } from './DeleteLink'
import { useGetLinksQuery } from './linksApiSlice'
import { ILink } from './linksSlice'

const ActivityIndicator = ({ active }: { active: boolean }) => {
	return (
		<div
			className={
				'tooltip tooltip-left cursor-pointer capitalize ' +
				(active ? 'tooltip-success' : 'tooltip-warning')
			}
			data-tip={active ? 'active' : 'inactive'}
		>
			<span className={'badge ' + (active ? 'badge-success' : 'badge-warning')}></span>
		</div>
	)
}

const LinkCard = ({
	id,
	slug,
	url,
	active,
	description,
	deleteLink,
}: ILink & { deleteLink: (link: ILink) => void }) => {
	return (
		<div className="card w-full max-w-md bg-base-200 p-4 shadow [&>*:not(:last-child)]:mb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-bold text-accent">{slug}</h3>
				<ActivityIndicator active={active} />
			</div>
			{description && (
				<p className="overflow-hidden text-ellipsis whitespace-nowrap">{description}</p>
			)}
			<a href={url} className="link" target="_blank">
				{url}
			</a>
			<div className="flex items-center justify-between">
				<div>
					<button
						className="btn btn-ghost btn-circle"
						onClick={() => deleteLink({ id, slug, url, active, description })}
					>
						<IoTrashOutline size="1.5em" />
					</button>
				</div>
				<div>
					<button className="btn btn-ghost btn-circle">
						<IoQrCodeOutline size="1.5em" />
					</button>
				</div>
			</div>
		</div>
	)
}

export const Links = () => {
	// const links = useSelector(selectLinks)

	const { isLoading, data: links, refetch } = useGetLinksQuery({ offset: 0, limit: 10 })
	const [addLinkModalOpen, setAddLinkModalOpen] = useState(false)
	const [deleteLinkModalOpen, setDeleteLinkModalOpen] = useState(false)
	const [linkToBeDeleted, setLinkToBeDeleted] = useState<ILink | null>(null)

	const handleDeleteLink = (link: ILink) => {
		setLinkToBeDeleted(link)
		setDeleteLinkModalOpen(true)
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	// const dispatch = useAppDispatch()

	// dispatch(addLinks(data as ILink[]))

	return (
		<div className="max-w-md border-r-[1px] border-base-200 pr-4 [&>*:not(:last-child)]:mb-4">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Links</h1>
				<button className="btn btn-ghost btn-circle" onClick={() => setAddLinkModalOpen(true)}>
					<IoMdAdd size="1.5em" />
				</button>
			</div>
			<AddLinkModal
				open={addLinkModalOpen}
				closeFn={() => {
					setAddLinkModalOpen(false)
				}}
				refetchFn={refetch}
			/>
			<DeleteLinkModal
				link={linkToBeDeleted}
				open={deleteLinkModalOpen}
				closeFn={() => {
					setDeleteLinkModalOpen(false)
				}}
				refetchFn={refetch}
			/>
			{(links as ILink[]).map((link) => (
				<LinkCard key={link.id} {...link} deleteLink={handleDeleteLink} />
			))}
		</div>
	)
}
