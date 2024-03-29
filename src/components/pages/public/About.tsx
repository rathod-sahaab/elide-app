export const About = () => {
	return (
		<div className="prose m-auto mt-12 min-h-screen max-w-screen-lg p-12">
			<section>
				<h1 className="text-center">About Elide</h1>
				<p>
					Elide started as a hobby project from a need during my time at my college society{' '}
					<a href="https://istenith.com" target="_blank">
						ISTE-NITH
					</a>
					. Being a college society we conducted awesome events which required some form of
					online links, be it registeration links, video conference links, stream event links,
					etc.
				</p>
				<p>
					The management of these links was a challenge and the idea of creating a tool to do
					just that which can be tinkered just to our liking was born.
				</p>
				<p>Some of the features we needed were:</p>
				<ul>
					<li>Links that can be pointed to any URL whenever we liked.</li>
					<li>Shared access for us to be able to work collaboratively.</li>
					<li>A way to group links together on basis of event.</li>
				</ul>
			</section>
			<section>
				<h2 className="text-center">Tech stack</h2>
				<p>
					The tech stack has been carefully picked to optimize performance, ease of getting
					started for new contributors, production readiness, development time and efforts,
					robustness and extensibility. The following tech stack has been used:
				</p>
				<h3 className="text-center">NodeJS + Typescript + Nest.js</h3>
			</section>
		</div>
	)
}
