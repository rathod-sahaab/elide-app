import { useParams } from 'react-router-dom'
import { useGetAnalyticsForLinkTimeSeriesQuery } from '../analyticsApiSlice'

import React, { useState } from 'react'
import { VisitsGraph } from './VisitsGraph'

export const timeSeriesToGraphData = (
	data: { x: number; time: string; visits: number; uniqueVisitors: number }[],
	{ dataPoints }: { dataPoints: number },
) => {
	const dataRows = new Array(dataPoints).fill([0, 0, 0]).map((_, i) => [i, 0, 0])

	data.forEach(({ x, visits, uniqueVisitors }) => {
		dataRows[x] = [x, visits, uniqueVisitors]
	})

	return [['Time', 'Visits', 'Unique'], ...dataRows]
}

export const Analytics: React.FC = () => {
	const params = useParams()
	const { linkId } = params as { linkId: string }

	const [startHrs, setStartHrs] = useState(24)

	const {
		data: timeSeriesData,
		error: timeSeriesError,
		isLoading: timeSeriesLoading,
	} = useGetAnalyticsForLinkTimeSeriesQuery({ linkId: Number(linkId), startHrs })

	return (
		<div className="p-4">
			<div className="btn-group">
				{[
					{
						label: '12 h',
						value: 12,
					},
					{
						label: '24 h',
						value: 24,
					},
					{
						label: '7 d',
						value: 24 * 7,
					},
					{
						label: '30 d',
						value: 24 * 30,
					},
				].map(({ label, value }) => (
					<button
						key={value}
						className={`btn ${value === startHrs ? 'btn-primary' : ''}`}
						onClick={() => setStartHrs(value)}
					>
						{label}
					</button>
				))}
			</div>
			{timeSeriesLoading ? (
				<div className="text-center">Loading...</div>
			) : (
				<VisitsGraph data={timeSeriesData} dataPoints={startHrs + 1} />
			)}
		</div>
	)
}
