import { IoCopyOutline, IoQrCodeOutline, IoSettingsOutline, IoTrashOutline } from 'react-icons/io5'
import { useAppDispatch } from '../../app/hooks/use-app-dispacth-selector'
import { openUpdateLinkModal, setLinkId } from '../../app/ui/uiSlice'
import { ActivityIndicator } from '../../components/atoms/ActivityIndicator'
import { ILink } from './linksSlice'

const CardButton = ({ children, onClick }: React.PropsWithChildren<{ onClick: () => void }>) => {
	return (
		<button className="tootip btn btn-ghost btn-square" onClick={onClick}>
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

	const dispatch = useAppDispatch()
	return (
		<div className="card w-full max-w-md bg-base-200 p-4 shadow [&>*:not(:last-child)]:mb-2 [&>.operations]:translate-y-full [&:hover>.operations]:translate-y-0">
			<div className="operations duration-350 btn-group rounded-btn absolute bottom-0 right-0 mr-2 bg-base-300 transition transition-transform">
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
				<CardButton
					onClick={() => {
						dispatch(setLinkId({ id }))
						dispatch(openUpdateLinkModal())
					}}
				>
					<IoSettingsOutline size="1.35em" />
				</CardButton>
				<CardButton onClick={() => deleteLink({ id, slug, url, active, description })}>
					<IoTrashOutline size="1.35em" />
				</CardButton>
			</div>
			<div className="flex items-center justify-between">
				<h3 className="align-middle font-bold text-accent">{slug}</h3>
				<ActivityIndicator active={active} />
			</div>
			{description ? (
				<p className="overflow-hidden text-ellipsis whitespace-nowrap">{description}</p>
			) : (
				<p className="text-content overflow-hidden text-ellipsis whitespace-nowrap italic opacity-50">
					No description
				</p>
			)}
			<a href={url} className="link" target="_blank">
				{url}
			</a>
		</div>
	)
}
