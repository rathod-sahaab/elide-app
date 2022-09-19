import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentUser } from '../../../../features/auth/authSlice'
import { Login } from '../../../../features/auth/Login'
import { ElideLinksBetterIllustration } from './ElideLinksBetterIllustration'

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
				<div className="prose m-auto flex w-[95%] max-w-screen-md flex-col items-center justify-center">
					<h2 className="text-center">Links must be simple</h2>
					<p>
						Humans are bad at remembering a bunch of meaningless numbers and letters. Domain
						names like <b>'google.com'</b>, <b>'elide.in'</b> were invented to avoid making
						you remember a meaningless set of numbers like <b>52.95.120.67</b>.
					</p>
					<p>
						Anyone can grab attention, smart people keep hold of it. Elide provides a simple
						an intuitive way to make your URLs more memorable and readable.
					</p>
					<ElideLinksBetterIllustration />
				</div>
			</section>
			<section>
				<div className="prose m-auto flex w-[95%] max-w-screen-md flex-col items-center justify-center">
					<h2 className="text-center">Dynamic Links!</h2>
					<p>
						It's ok to mistakes, it's not ok to if you can't fix it. Sometimes you need to
						change the link where your users should go due to some unavoidable reason. BUt you
						have already distributed them out. With elide, no worries just point your elide
						link to new link and your are good to go!
					</p>
				</div>
			</section>
			<section>
				<div className="prose m-auto flex w-[95%] max-w-screen-md flex-col items-center justify-center">
					<h2 className="text-center">Collaborate with your teams</h2>
					<p>
						<b>Apes, strong, together!</b> Elide provides a simple way to collaborate with
						your teams. Create a team, invite your friends and start shortening links
						together. Create project to better organize your links and avoid{' '}
						<b>too many cooks, spoil the broth</b> situations.
					</p>
				</div>
			</section>
			<section>
				<div className="prose m-auto flex w-[95%] max-w-screen-md flex-col items-center justify-center">
					<h2 className="text-center">Insightful analytics</h2>
					<p>
						Get a visualisation of your links and get a better understanding of how your links
						are performing. How your links are growing, where are they most being accessed
						from and the whole jazz.
					</p>
				</div>
			</section>
		</div>
	)
}
