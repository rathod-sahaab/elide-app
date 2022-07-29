import { IoCopyOutline, IoQrCodeOutline, IoSettingsOutline, IoTrashOutline } from 'react-icons/io5'
import { ActivityIndicator } from '../../components/atoms/ActivityIndicator'
import { ILink } from './linksSlice'

const CardButton = ({ children, onClick }: React.PropsWithChildren<{ onClick: () => void }>) => {
	return (
		<button className="btn btn-ghost btn-circle" onClick={onClick}>
			{children}
		</button>
	)
}

export const LinkCard = ({
	id,
	slug,
	url,
	active,
	description,
	deleteLink,
	setActiveQr,
}: ILink & { deleteLink: (link: ILink) => void; setActiveQr: (value: string) => void }) => {
	const elideUrl = `https://elide.in/${slug}`
	return (
		<div className="card relative w-full max-w-md bg-base-200 p-4 shadow [&>*:not(:last-child)]:mb-2 [&>.operations]:translate-x-full [&:hover>.operations]:translate-x-0">
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
			<div className="operations absolute bottom-0 right-0 bg-base-200 transition transition-transform duration-250">
				<CardButton onClick={() => deleteLink({ id, slug, url, active, description })}>
					<IoTrashOutline size="1.35em" />
				</CardButton>
				<CardButton onClick={() => setActiveQr(elideUrl)}>
					<IoQrCodeOutline size="1.35em" />
				</CardButton>
				<CardButton
					onClick={() => {
						window.navigator.clipboard.writeText(elideUrl)
					}}
				>
					<IoCopyOutline size="1.35em" />
				</CardButton>
				<CardButton onClick={() => console.log('TODO: edit link')}>
					<IoSettingsOutline size="1.35em" />
				</CardButton>
			</div>
		</div>
	)
}