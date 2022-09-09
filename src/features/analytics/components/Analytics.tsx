import Chart from 'react-google-charts'
import { useParams } from 'react-router-dom'
import { useGetAnalyticsForLinkTimeSeriesQuery } from '../analyticsApiSlice'

export const timeSeriesDataToTable = (
	data: { x: number; time: string; visits: number; uniqueVisitors: number }[],
) => {
	return [
		['Time', 'Visits', 'Unique'],
		...data.map(({ x, time, visits, uniqueVisitors }) => [
			new Date(time),
			visits,
			uniqueVisitors,
		]),
	]
}

export const Analytics: React.FC = () => {
	const params = useParams()
	const { linkId } = params as { linkId: string }

	const {
		data: timeSeriesData,
		error: timeSeriesError,
		isLoading: timeSeriesLoading,
	} = useGetAnalyticsForLinkTimeSeriesQuery({ linkId: Number(linkId) })

	return (
		<div>
			<div className="text-center">{linkId}</div>
			{timeSeriesLoading ? (
				<div className="text-center">Loading...</div>
			) : (
				<Chart
					chartType="AreaChart"
					width="100%"
					height="500px"
					data={timeSeriesDataToTable(timeSeriesData)}
					options={{
						vAxis: { minValue: 0 },
						hAxis: {
							title: 'Time',
							minValue: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
							maxValue: new Date(),
						},
					}}
				></Chart>
			)}
		</div>
	)
}
