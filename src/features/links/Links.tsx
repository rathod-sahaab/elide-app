import { useState } from 'react'
import { HiOutlineFolder, HiOutlineUsers } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { AddLinkModal } from './AddLink'
import { DeleteLinkModal } from './DeleteLink'
import { LinkCard } from './LinkCard'
import { useGetLinksQuery } from './linksApiSlice'
import { ILink } from './linksSlice'
import { QrCodeModal } from './QrCodeModal'

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
						className="btn btn-ghost btn-circle"
						onClick={() => setAddLinkModalOpen(true)}
					>
						<IoMdAdd size="2em" />
					</button>
				</div>
			</div>
			<div className="divider m-auto max-w-screen-lg p-4 [&::before]:w-auto [&::after]:w-auto">
				{false && (
					<div className="breadcrumbs hidden text-sm">
						<ul>
							<li>
								<HiOutlineUsers className="mr-2" /> Organisation
							</li>
							<li>
								<HiOutlineFolder className="mr-2" /> Project
							</li>
						</ul>
					</div>
				)}
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
			<div className="m-auto grid max-w-fit grid-cols-1 items-start gap-4 md:grid-cols-2 2xl:grid-cols-3">
				{links &&
					(links as ILink[]).map((link) => (
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
