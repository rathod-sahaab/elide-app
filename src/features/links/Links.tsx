import { IoMdAdd } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { AddLinkCard } from './AddLink'
import { selectLinks } from './linksSlice'

export const Links = () => {
	const links = useSelector(selectLinks)
	console.log({ links })

	const linksList = links.map(({ id, slug, url, active }) => {
		console.log(active)
		return (
			<div
				key={id}
				className="card bg-base-200 max-w-sm w-full shadow p-4 [&>*:not(:last-child)]:mb-2"
			>
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-accent">{slug}</h3>
					<span className={'badge ' + (active ? 'badge-success' : 'badge-warning')}></span>
				</div>
				<a href={url} className="link">
					{url}
				</a>
			</div>
		)
	})

	return (
		<div className="[&>*:not(:last-child)]:mb-4 pr-6 border-r-2 border-base-300 max-w-sm">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Links</h1>
				<button className="btn btn-ghost btn-circle">
					<IoMdAdd size="1.5em" />
				</button>
			</div>
			<AddLinkCard />
			{linksList}
		</div>
	)
}
