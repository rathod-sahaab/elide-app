import { useParams } from 'react-router-dom'
import {
	useGetAnalyticsForLinkTimeSeriesQuery,
	useGetAnalyticsForLinkUserAgentsQuery,
} from '../analyticsApiSlice'

import React, { useState } from 'react'
import { VisitsGraph } from './VisitsGraph'
import { DoughnutGraph } from './DoughnutGraph'
import { UserAgentGraphs } from './UserAgentGraphs'

export const Analytics: React.FC = () => {
	const params = useParams()
	const { linkId } = params as { linkId: string }

	const [startHrs, setStartHrs] = useState(24)

	const {
		data: timeSeriesData,
		error: timeSeriesError,
		isLoading: timeSeriesLoading,
	} = useGetAnalyticsForLinkTimeSeriesQuery({ linkId: Number(linkId), startHrs })

	const {
		data: userAgentsData,
		error: userAgentsError,
		isLoading: userAgentsLoading,
	} = useGetAnalyticsForLinkUserAgentsQuery({ linkId: Number(linkId), startHrs })

	if (timeSeriesError) {
		return <div>Failed to load analytics</div>
	}

	return (
		<div className="p-4">
			<TimeSelector startHrs={startHrs} setStartHrs={setStartHrs} />
			{timeSeriesLoading ? (
				<div className="text-center">Loading...</div>
			) : (
				<VisitsGraph data={timeSeriesData} dataPoints={startHrs + 1} />
			)}
			{userAgentsLoading ? (
				<div className="text-center">Loading...</div>
			) : (
				<UserAgentGraphs userAgentsData={userAgentsData} />
			)}
		</div>
	)
}

const TimeSelector = ({
	startHrs,
	setStartHrs,
}: {
	startHrs: number
	setStartHrs: React.Dispatch<React.SetStateAction<number>>
}) => (
	<div className="mb-4 flex flex-col items-center">
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
	</div>
)
