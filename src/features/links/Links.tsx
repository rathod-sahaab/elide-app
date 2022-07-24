import { IoMdAdd } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { AddLinkCard } from './AddLink'
import { ILink, selectLinks } from './linksSlice'

const LinkCard = ({ slug, url, active }: ILink) => {
	const ActivityIndicator = ({ active }: { active: boolean }) => {
		return (
			<div className="tooltip tooltip-left" data-tip={active ? 'active' : 'inactive'}>
				<span className={'badge ' + (active ? 'badge-success' : 'badge-warning')}></span>
			</div>
		)
	}

	return (
		<div className="card bg-base-200 max-w-sm w-full shadow p-4 [&>*:not(:last-child)]:mb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-bold text-accent">{slug}</h3>
				<ActivityIndicator active={active} />
			</div>
			<a href={url} className="link">
				{url}
			</a>
		</div>
	)
}

export const Links = () => {
	const links = useSelector(selectLinks)

	return (
		<div className="[&>*:not(:last-child)]:mb-4 pr-6 border-r-2 border-base-300 max-w-sm">
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
