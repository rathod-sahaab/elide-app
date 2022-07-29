import { NoSidebarLayout } from '../../Layout'

export const AboutContent = () => {
	return (
		<div className="prose m-auto min-h-screen max-w-screen-lg p-12">
			<h1 className="text-center">About</h1>
			<section>
				<h2 className="text-center">Tech stack</h2>
				<p>
					The tech stack has been carefully picked to optimize performance, development time
					and efforts, robustness and extensibility. The following tech stack has been used:
				</p>
				<h3 className="text-center">NodeJS + Typescript + Nest.js</h3>
			</section>
		</div>
	)
}

export const About = () => {
	return (
		<NoSidebarLayout fixedNavbar={false}>
			<AboutContent />
		</NoSidebarLayout>
	)
}
