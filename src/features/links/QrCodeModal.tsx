import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineFileDownload } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../app/hooks/use-app-dispacth-selector'
import { useTheme } from '../../app/hooks/use-theme'
import { closeQrModal, uiSelectQr } from '../../app/ui/uiSlice'

const LEVELS = ['L', 'M', 'Q', 'H'] as const
type LevelType = typeof LEVELS[number]

export const QrCodeModal = () => {
	const { qrModal: open, qrText } = useAppSelector(uiSelectQr)
	const dispatch = useAppDispatch()

	const [level, setLevel] = useState<LevelType>('L')

	const slug = qrText.split('/').pop()
	const [base64Svg, setBase64Svg] = useState<string | null>(null)

	const { theme } = useTheme()

	useEffect(() => {
		const element = document.getElementById('link-svg-qr')
		const svg = element?.outerHTML
		if (!svg) {
			console.error('no svg')
			return
		}

		setBase64Svg(btoa(svg))
	}, [level, qrText])

	return createPortal(
		<div className={'modal ' + (open ? 'modal-open' : '')} data-theme={theme}>
			<div className="modal-box relative w-max overflow-visible bg-base-200">
				<button
					className="btn btn-square absolute -top-6 -right-6"
					onClick={() => {
						dispatch(closeQrModal())
					}}
				>
					<IoMdClose size="1.5em" />
				</button>
				<div className="card border-4 border-base-content p-3">
					{/* Display SVG QR */}
					<QRCodeSVG
						value={qrText}
						size={256}
						level={level}
						fgColor="currentColor"
						bgColor="transparent"
					/>
					{/* Download SVG QR */}
					<QRCodeSVG
						id="link-svg-qr"
						value={qrText}
						size={256}
						level={level}
						className="hidden"
					/>
					{/* Download PNG QR */}
					<QRCodeCanvas
						id="link-canvas-qr"
						value={qrText}
						size={256}
						level={level}
						className="hidden"
					/>
				</div>
				<div className="options">
					<p className="mt-6 text-center font-bold uppercase">error tolerance level</p>
					<div className="btn-group mt-2 flex">
						{LEVELS.map((l) => (
							<button
								key={l}
								className={'btn flex-1 ' + (l === level ? 'btn-active' : '')}
								onClick={() => setLevel(l)}
							>
								{l}
							</button>
						))}
					</div>
					<div className="btn-group mt-6">
						<a className="btn btn-disabled w-1/2">
							<MdOutlineFileDownload size="1.5em" className="mr-2" /> png
						</a>
						<a
							className="btn w-1/2"
							download={`elide-in-${slug}-${level}.svg`}
							href={`data:img/svg+xml;base64,${base64Svg}`}
						>
							<MdOutlineFileDownload size="1.5em" className="mr-2" /> svg
						</a>
					</div>
				</div>
			</div>
		</div>,
		document.getElementById('modal-root') as HTMLElement,
	)
}
