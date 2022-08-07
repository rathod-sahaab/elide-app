import { useState } from 'react'
import { HiOutlineFolder, HiOutlineLink, HiOutlineUsers } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { useAppSelector } from '../../app/hooks/use-app-dispacth-selector'
import { selectOrganisation } from '../organisations/organisationsSlice'
import { selectActiveProject } from '../projects/projectsSlice'
import { AddLinkModal } from './AddLink'
import { DeleteLinkModal } from './DeleteLink'
import { LinkCard } from './LinkCard'
import { useGetLinksQuery } from './linksApiSlice'
import { ILink } from './linksSlice'
import { QrCodeModal } from './QrCodeModal'

export const Links = () => {
	const activeOrganisation = useAppSelector(selectOrganisation)
	const activeProject = useAppSelector(selectActiveProject)

	// FIXME: clear active organisation and project if they cause error
	const {
		isLoading,
		data: links,
		refetch,
	} = useGetLinksQuery({
		offset: 0,
		limit: 10,
		organisationId: activeOrganisation.organisation?.id,
		projectId: activeProject.project?.id,
	})

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

	return (
		<div className="[&>*:not(:last-child)]:mb-4">
			<div className="m-auto mb-6 flex max-w-screen-sm items-center justify-between">
				{
					<div className="breadcrumbs overflow-visible">
						<ul>
							{activeOrganisation.organisation && (
								<li>
									<HiOutlineUsers className="mr-2" size="1.35em" />{' '}
									<span className="tooltip" data-tip="Selected Organization">
										{activeOrganisation.organisation.name}
									</span>
								</li>
							)}
							{activeProject.project && (
								<li>
									<HiOutlineFolder className="mr-2" size="1.35em" />
									<span className="tooltip" data-tip="Selected Project">
										{activeProject.project.name}
									</span>
								</li>
							)}
							<li>
								<HiOutlineLink className="mr-2" size="1.35em" /> Links
							</li>
						</ul>
					</div>
				}
				<div className="tooltip tooltip-left" data-tip="Create Link">
					<button
						className="btn btn-ghost btn-circle"
						onClick={() => setAddLinkModalOpen(true)}
					>
						<IoMdAdd size="1.75em" />
					</button>
				</div>
			</div>
			<div className="divider m-auto max-w-screen-md p-4"></div>
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
			<div className="m-auto grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
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
