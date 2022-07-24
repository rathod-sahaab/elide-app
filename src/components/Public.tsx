import { FiCheckCircle } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentToken } from '../features/auth/authSlice'
import { Login } from '../features/auth/Login'

export const Public = () => {
	const token = useSelector(selectCurrentToken)

	return (
		<div className="w-screen h-screen [&>section:not(:first-child)]:py-12 [&>section:not(:first-child)]:px-6 overflow-auto">
			<section className="w-screen lg:h-screen flex flex-col lg:flex-row items-center justify-around pt-24 lg:pt-0">
				<div className="prose p-6 lg:my-0">
					<h1>Elide, make your urls simpler</h1>
					<p>
						Manage your urls, make them more readable and memorable, collablorate with your
						teams, insightful analytics and war-room like realtime updates. All using an app
						with beautiful UI and a UX that makes sense.
					</p>
					<p>
						Did I mention that the app is OpenSource under MIT license! Pitch a feature you
						would like and someone very cool can implement your idea, better still you can add
						it yourself!
					</p>
				</div>
				<div className="w-full max-w-sm card shadow-lg p-6 bg-base-200">
					{token ? (
						<>
							<div className="p-6 flex flex-col items-center justify-center">
								<FiCheckCircle className="text-success text-4xl" />
								<div className="pt-6 text-xl">Already logged in!</div>
							</div>
							<Link to="/dashboard" className="btn">
								Go to Dashboard
							</Link>
						</>
					) : (
						<Login />
					)}
				</div>
			</section>
			<section>
				<div className="prose m-auto flex flex-col items-center justify-center">
					<h1 className="text-center">URLs must be simple</h1>
					<p>
						Humans are bad at remembering a bunch of meaningless numbers and letters. Domain
						names like <b>'google.com'</b>, <b>'elide.in'</b> were invented to avoid making
						you remember a meaningless set of numbers like <b>52.95.120.67</b>.
					</p>
					<p>
						Anyone can grab attention but you have to be smart to not throw it away. Elide
						provides a simple an intuitive way to make your URLs more memorable and readable.
					</p>
				</div>
			</section>
		</div>
	)
}