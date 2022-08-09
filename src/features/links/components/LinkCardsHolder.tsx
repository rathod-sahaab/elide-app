import { useAppSelector } from '../../../app/hooks/use-app-dispacth-selector'
import { ILink, selectLinks } from '../linksSlice'
import { LinkCard } from './LinkCard'

export const LinkCardsHolder = () => {
	const links = useAppSelector(selectLinks)

	return (
		<>
			<div className="m-auto grid max-w-screen-sm grid-cols-1 gap-4 md:max-w-screen-md md:grid-cols-2 2xl:max-w-screen-xl 2xl:grid-cols-3 [&>*]:justify-self-center">
				{links &&
					(links as ILink[]).map((link) => (
						<LinkCard
							key={link.id}
							{...link}
							// deleteLink={handleDeleteLink}
							// setActiveQr={handleQrCodeClick}
						/>
					))}
			</div>
			{links.length === 0 && (
				<div className="my-24 text-center">
					<p className="text-xl italic opacity-70">
						You have no links in current context... create one now!
					</p>
				</div>
			)}
		</>
	)
}
