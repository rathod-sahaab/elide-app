import { useEffect, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '../../app/hooks/use-app-dispacth-selector'
import { selectOrganisation } from '../organisations/organisationsSlice'
import { selectActiveProject } from '../projects/projectsSlice'
import { AddLinkModal } from './AddLink'
import { LinksBreadcrumbs } from './components/LinkBreadcrumbs'
import { DeleteLinkModal } from './DeleteLink'
import { useLazyGetLinksQuery } from './linksApiSlice'
import { addLinks, clearLinks, ILink, selectLinks } from './linksSlice'
import { QrCodeModal } from './QrCodeModal'
import { UpdateLinkModal } from './UpdateLink'
import { LinkCardsHolder } from './components/LinkCardsHolder'
import { openCreateLinkModal } from '../../app/ui/uiSlice'

const LIMIT: number = 12 // good for 3, 2, 1 col grid

export const Links = () => {
	const activeOrganisation = useAppSelector(selectOrganisation)
	const activeProject = useAppSelector(selectActiveProject)

	const [offset, setOffset] = useState(0)
	const [hasMore, setHasMore] = useState(true)
	const [forceFetch, setForceFetch] = useState(1)

	const [getLinksTrigger, { isLoading }] = useLazyGetLinksQuery()

	const dispatch = useAppDispatch()

	const links = useAppSelector(selectLinks)

	const isMounted = useRef(false)

	useEffect(() => {
		setOffset(0)
		setHasMore(true)
		setForceFetch((oldForceFetch) => oldForceFetch + 1)
	}, [activeOrganisation, activeProject])

	async function fetchLinks() {
		try {
			const linksResponse: ILink[] = await getLinksTrigger({
				organisationId: activeOrganisation.organisation?.id,
				projectId: activeProject.project?.id,
				offset,
				limit: LIMIT,
			}).unwrap()
			if (linksResponse.length !== LIMIT) {
				setHasMore(false)
			}
			dispatch(addLinks(linksResponse))
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		if (isMounted.current) {
			if (offset === 0) {
				dispatch(clearLinks())
			}
			fetchLinks()
		} else {
			isMounted.current = true
		}
	}, [offset, forceFetch])

	return (
		<div>
			<div className="m-auto mb-6 flex max-w-screen-sm items-center justify-between">
				<LinksBreadcrumbs />
				<div className="tooltip tooltip-left" data-tip="Create Link">
					<button
						className="btn btn-ghost btn-circle"
						onClick={() => {
							dispatch(openCreateLinkModal())
						}}
					>
						<IoMdAdd size="1.75em" />
					</button>
				</div>
			</div>
			<AddLinkModal />
			<UpdateLinkModal />
			<DeleteLinkModal />
			<QrCodeModal />
			<LinkCardsHolder />
			{!isLoading && links.length > 0 && (
				<div className="py-12 text-center">
					{hasMore ? (
						<button
							className="btn btn-primary w-full max-w-sm"
							onClick={() => {
								setOffset((oldOffset) => oldOffset + LIMIT)
							}}
						>
							Load More
						</button>
					) : (
						<p className="text-xl italic opacity-70">No more links to load... create more!</p>
					)}
				</div>
			)}
		</div>
	)
}
