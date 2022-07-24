import { IoMdAdd } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { AddLinkCard } from './AddLink'
import { ILink, selectLinks } from './linksSlice'

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
		<div className="card bg-base-200 max-w-md w-full shadow p-4 [&>*:not(:last-child)]:mb-2">
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
	const links = useSelector(selectLinks)

	return (
		<div className="[&>*:not(:last-child)]:mb-4 pr-4 border-r-[1px] border-base-200 max-w-md">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Links</h1>
				<button className="btn btn-ghost btn-circle">
					<IoMdAdd size="1.5em" />
				</button>
			</div>
			{links.map((data) => (
				<LinkCard key={data.id} {...data} />
			))}
			<AddLinkCard />
		</div>
	)
}
