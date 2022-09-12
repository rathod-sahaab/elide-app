import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentUser } from '../../../features/auth/authSlice'
import { Login } from '../../../features/auth/Login'

export const Home = () => {
	const user = useSelector(selectCurrentUser)

	return (
		<div className="h-screen w-screen overflow-auto [&>section:not(:first-child)]:py-12 [&>section:not(:first-child)]:px-6">
			<section className="flex w-screen flex-col items-center justify-around pt-24 lg:h-screen lg:flex-row lg:pt-0">
				<div className="prose p-6 lg:my-0">
					<h1>Elide, make your links simpler</h1>
					<p>
						Manage your links, make them more readable and memorable, collablorate with your
						teams, insightful analytics and war-room like realtime updates. All using an app
						with beautiful UI and a UX that makes sense.
					</p>
					<p>
						Did I mention that the app is OpenSource under MIT license! Pitch a feature you
						would like and someone very cool can implement your idea, better still you can add
						it yourself!
					</p>
				</div>
				<div className="card w-full max-w-sm bg-base-200 p-6 shadow-lg">
					{user ? (
						<>
							<div className="prose mb-6">
								<h3>Let's get rolling!</h3>
								<p>Simplfy, collaborate and analyze.</p>
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
					<h1 className="text-center">Links must be simple</h1>
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
