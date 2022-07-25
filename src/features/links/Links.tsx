import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { AddLinkModal } from './AddLink'
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

const LinkCard = ({ slug, url, active, description }: ILink) => {
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
		</div>
	)
}

export const Links = () => {
	// const links = useSelector(selectLinks)

	const { isLoading, data: links } = useGetLinksQuery({ offset: 0, limit: 10 })
	const [open, setOpen] = useState(false)

	if (isLoading) {
		return <div>Loading...</div>
	}

	// const dispatch = useAppDispatch()

	// dispatch(addLinks(data as ILink[]))

	return (
		<div className="max-w-md border-r-[1px] border-base-200 pr-4 [&>*:not(:last-child)]:mb-4">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Links</h1>
				<button className="btn btn-ghost btn-circle" onClick={() => setOpen(true)}>
					<IoMdAdd size="1.5em" />
				</button>
			</div>
			<AddLinkModal
				open={open}
				closeFn={() => {
					setOpen(false)
				}}
			/>
			{(links as ILink[]).map((link: ILink, index) => (
				<div>
					<LinkCard key={link.id} {...link} />
				</div>
			))}
		</div>
	)
}
