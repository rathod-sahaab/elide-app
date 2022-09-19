import { useState } from 'react'

const ELIDE_LINK = 'https://elide.in/elide-survey'
const FORMS_LINK = 'https://forms.gle/YuWtoJGsJku69a5P7'

export const ElideLinksBetterIllustration = () => {
	const [isElideLink, setIsElideLink] = useState(false)

	return (
		<div className="text-center">
			<b>Click and see!</b>
			<br />
			<br />
			<button
				className={`btn normal-case ${isElideLink ? 'btn-success' : 'btn-warning'}`}
				onClick={() => {
					setIsElideLink((prev) => !prev)
				}}
			>
				{isElideLink ? ELIDE_LINK : FORMS_LINK}
			</button>
		</div>
	)
}
