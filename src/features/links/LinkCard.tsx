import { IoQrCodeOutline, IoTrashOutline } from 'react-icons/io5'
import { ActivityIndicator } from '../../components/atoms/ActivityIndicator'
import { ILink } from './linksSlice'

export const LinkCard = ({
	id,
	slug,
	url,
	active,
	description,
	deleteLink,
	setActiveQr,
}: ILink & { deleteLink: (link: ILink) => void; setActiveQr: (value: string) => void }) => {
	return (
		<div className="card relative w-full max-w-md bg-base-200 p-4 shadow [&>*:not(:last-child)]:mb-2 [&>.operations]:max-h-0 [&:hover>.operations]:max-h-12">
			<div className="flex items-center justify-between">
				<h3 className="align-middle font-bold text-accent">{slug}</h3>
				<ActivityIndicator active={active} />
			</div>
			{description && (
				<p className="overflow-hidden text-ellipsis whitespace-nowrap">{description}</p>
			)}
			<a href={url} className="link" target="_blank">
				{url}
			</a>
			<div
				className="operations absolute bottom-0 right-0 flex flex-row items-center justify-between overflow-hidden bg-base-200 transition"
				style={{
					transitionProperty: 'max-height',
				}}
			>
				<div>
					<button
						className="btn btn-ghost btn-circle"
						onClick={() => deleteLink({ id, slug, url, active, description })}
					>
						<IoTrashOutline size="1.5em" />
					</button>
				</div>
				<div>
					<button
						className="btn btn-ghost btn-circle"
						onClick={() => setActiveQr(`https://elide.in/${slug}`)}
					>
						<IoQrCodeOutline size="1.5em" />
					</button>
				</div>
			</div>
		</div>
	)
}
