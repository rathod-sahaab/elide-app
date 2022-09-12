import { DoughnutGraph } from './DoughnutGraph'

export const UserAgentGraphs = ({
	userAgentsData: { browsers, oses },
}: {
	userAgentsData: {
		browsers: {
			browser: string
			visits: number
			uniqueVisitors: number
		}[]
		oses: {
			os: string
			visits: number
			uniqueVisitors: number
		}[]
	}
}) => {
	const browser = {
		labels: browsers.map((b) => b.browser),
		vists: browsers.map((browser) => browser.visits),
		uniqueVisitors: browsers.map((browser) => browser.uniqueVisitors),
	}
	const os = {
		labels: oses.map((b) => b.os),
		vists: oses.map((browser) => browser.visits),
		uniqueVisitors: oses.map((browser) => browser.uniqueVisitors),
	}
	return (
		<div className="rounded-box m-auto my-4 flex flex-wrap max-w-screen-lg bg-base-200 p-2">
			<DoughnutGraph title="Visits by Browsers" labels={browser.labels} data={browser.vists} />
			<DoughnutGraph
				title="Unique visitors by Browsers"
				labels={browser.labels}
				data={browser.uniqueVisitors}
			/>
			<DoughnutGraph title="Visits by Operating Systems" labels={os.labels} data={os.vists} />
			<DoughnutGraph
				title="Unique visitors by Operating Systems"
				labels={os.labels}
				data={os.uniqueVisitors}
			/>
		</div>
	)
}
