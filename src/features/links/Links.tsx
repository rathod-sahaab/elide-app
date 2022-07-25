import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { AddLinkCard, AddLinkModal } from './AddLink'
import { useGetLinksQuery } from './linksApiSlice'
import { ILink } from './linksSlice'

const ActivityIndicator = ({ active }: { active: boolean }) => {
	return (
		<div
			className={
				'tooltip tooltip-left capitalize cursor-pointer ' +
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
		<div className="max-w-md w-full [&>*:not(:last-child)]:mb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-bold text-accent">{slug}</h3>
				<ActivityIndicator active={active} />
			</div>
			{description && (
				<p className="text-ellipsis overflow-hidden whitespace-nowrap">{description}</p>
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
		<div className="[&>*:not(:last-child)]:mb-4 pr-4 border-r-[1px] border-base-200 max-w-md">
			<div className="flex items-center justify-between mb-6">
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
					<div className="divider"></div>
				</div>
			))}
		</div>
	)
}
