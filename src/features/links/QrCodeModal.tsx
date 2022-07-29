import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import { useEffect, useMemo, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineFileDownload } from 'react-icons/md'
import { useTheme } from '../../hooks/use-theme'

const LEVELS = ['L', 'M', 'Q', 'H'] as const
type LevelType = typeof LEVELS[number]

export const QrCodeModal = ({
	open,
	closeFn,
	data,
}: {
	open: boolean
	closeFn: () => void
	data: string
}) => {
	const [level, setLevel] = useState<LevelType>('L')

	const slug = data.split('/').pop()
	const [base64Svg, setBase64Svg] = useState<string | null>(null)

	const [qrBgColor, setQrBgColor] = useState<string>()

	const { theme } = useTheme()

	useEffect(() => {
		const element = document.getElementById('link-svg-qr')
		const svg = element?.outerHTML
		if (!svg) {
			console.error('no svg')
			return
		}

		setBase64Svg(btoa(svg))
	}, [level, data])

	useEffect(() => {
		const style = window.getComputedStyle(document.body)
		setQrBgColor(style.getPropertyValue('--b2'))
	}, [theme])

	return (
		<div className={'modal ' + (open ? 'modal-open' : '')}>
			<div className="modal-box relative w-max overflow-visible bg-base-200">
				<button className="btn btn-square absolute -top-6 -right-6" onClick={closeFn}>
					<IoMdClose size="1.5em" />
				</button>
				<div className="card border-4 border-base-content p-3">
					{/* Display SVG QR */}
					<QRCodeSVG
						value={data}
						size={256}
						level={level}
						fgColor="currentColor"
						bgColor="transparent"
					/>
					{/* Download SVG QR */}
					<QRCodeSVG
						id="link-svg-qr"
						value={data}
						size={256}
						level={level}
						className="hidden"
					/>
					{/* Download PNG QR */}
					<QRCodeCanvas
						id="link-canvas-qr"
						value={data}
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
		</div>
	)
}
