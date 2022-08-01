import { createPortal } from 'react-dom'
import { IoMdClose } from 'react-icons/io'
import { useTheme } from '../app/hooks/use-theme'

export const ElideModal = ({
	open,
	closeFn,
	children,
	title,
}: React.PropsWithChildren<{
	open: boolean
	closeFn: () => void
	title: string
}>) => {
	const { theme } = useTheme()
	return createPortal(
		<div className={'modal ' + (open ? 'modal-open' : '')} data-theme={theme}>
			<div className="modal-box relative max-w-md overflow-visible bg-base-200">
				<button className="btn btn-square absolute -top-6 -right-6" onClick={closeFn}>
					<IoMdClose size="1.5em" />
				</button>
				<h1 className="mb-6 text-2xl font-bold text-primary">{title}</h1>
				{children}
			</div>
		</div>,
		document.getElementById('modal-root') as HTMLElement,
	)
}
