import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { IoQrCodeOutline, IoTrashOutline } from 'react-icons/io5'
import { AddLinkModal } from './AddLink'
import { DeleteLinkModal } from './DeleteLink'
import { useGetLinksQuery } from './linksApiSlice'
import { ILink } from './linksSlice'
import { QrCodeModal } from './QrCodeModal'

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
	setActiveQr,
}: ILink & { deleteLink: (link: ILink) => void; setActiveQr: (value: string) => void }) => {
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
						className="btn btn-circle btn-ghost"
						onClick={() => deleteLink({ id, slug, url, active, description })}
					>
						<IoTrashOutline size="1.5em" />
					</button>
				</div>
				<div>
					<button
						className="btn btn-circle btn-ghost"
						onClick={() => setActiveQr(`https://elide.in/${slug}`)}
					>
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

	// modals
	const [addLinkModalOpen, setAddLinkModalOpen] = useState(false)
	const [deleteLinkModalOpen, setDeleteLinkModalOpen] = useState(false)
	const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false)

	const [linkToBeDeleted, setLinkToBeDeleted] = useState<ILink | null>(null)
	const [qrCodeData, setQrCodeData] = useState<string>('')

	const handleDeleteLink = (link: ILink) => {
		setLinkToBeDeleted(link)
		setDeleteLinkModalOpen(true)
	}

	const handleQrCodeClick = (value: string) => {
		setQrCodeData(value)
		setQrCodeModalOpen(true)
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	// const dispatch = useAppDispatch()

	// dispatch(addLinks(data as ILink[]))

	return (
		<div className="[&>*:not(:last-child)]:mb-4">
			<div className="m-auto mb-6 flex max-w-screen-sm items-center justify-between">
				<h1 className="text-2xl font-bold">Links</h1>
				<div className="tooltip tooltip-left" data-tip="Create Link">
					<button
						className="btn btn-circle btn-ghost"
						onClick={() => setAddLinkModalOpen(true)}
					>
						<IoMdAdd size="1.5em" />
					</button>
				</div>
			</div>
			<div className="divider m-auto max-w-screen-lg p-4">
				<div className="breadcrumbs text-sm">
					<ul>
						<li>Organisation</li>
						<li>Project</li>
					</ul>
				</div>
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
			<QrCodeModal
				open={qrCodeModalOpen}
				closeFn={() => {
					setQrCodeModalOpen(false)
				}}
				data={qrCodeData}
			/>
			<div className="m-auto grid max-w-fit grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
				{(links as ILink[]).map((link) => (
					<LinkCard
						key={link.id}
						{...link}
						deleteLink={handleDeleteLink}
						setActiveQr={handleQrCodeClick}
					/>
				))}
			</div>
		</div>
	)
}
