import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useMemo, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineFileDownload } from 'react-icons/md'

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

	useEffect(() => {
		const element = document.getElementById('link-qr')
		const svg = element?.outerHTML
		if (!svg) {
			console.error('no svg')
			return
		}

		setBase64Svg(btoa(svg))
	}, [level, data])

	return (
		<div className={'modal ' + (open ? 'modal-open' : '')}>
			<div className="modal-box relative w-max overflow-visible bg-base-200">
				<button className="btn btn-circle absolute -top-5 -right-5" onClick={closeFn}>
					<IoMdClose size="1.5em" />
				</button>
				<QRCodeSVG id="link-qr" value={data} size={256} level={level} />
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
						<a className="btn w-1/2">
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
