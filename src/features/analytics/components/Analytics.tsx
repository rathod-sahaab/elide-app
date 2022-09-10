import { useParams } from 'react-router-dom'
import { useGetAnalyticsForLinkTimeSeriesQuery } from '../analyticsApiSlice'

import React, { useState } from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const timeSeriesDataToTable = (
	data: { x: number; time: string; visits: number; uniqueVisitors: number }[],
	{ dataPoints }: { dataPoints: number },
) => {
	const dataRows = new Array(dataPoints).fill([0, 0, 0]).map((_, i) => [i, 0, 0])

	data.forEach(({ x, visits, uniqueVisitors }) => {
		dataRows[x] = [x, visits, uniqueVisitors]
	})

	return [['Time', 'Visits', 'Unique'], ...dataRows]
}

const VisitsGraph = ({
	data,
	dataPoints,
}: {
	data: { x: number; time: string; visits: number; uniqueVisitors: number }[]
	dataPoints: number
}) => {
	const nowDate = new Date()

	const nowHourDate = new Date(
		nowDate.getFullYear(),
		nowDate.getMonth(),
		nowDate.getDate(),
		nowDate.getHours(),
	)

	const labels = new Array(dataPoints).fill(0).map((_, i) => {
		const date = new Date(nowHourDate.getTime() - (dataPoints - i) * 60 * 60 * 1000)

		const timeAmPm = `${date.getHours() % 12 || 12} ${date.getHours() < 12 ? 'am' : 'pm'}`

		return `${date.getHours() === 0 ? date.toLocaleDateString() + ' ' : ''}${timeAmPm}`
	})
	const uniqueVisitorsData = new Array(dataPoints).fill(0)
	const visitsData = new Array(dataPoints).fill(0)

	data.forEach(({ x, visits, uniqueVisitors }) => {
		visitsData[x] = visits
		uniqueVisitorsData[x] = uniqueVisitors
	})
	return (
		<div className="card m-auto max-w-screen-lg rounded-lg bg-base-200 p-4">
			<Line
				data={{
					labels,
					datasets: [
						{
							label: 'Unique Visits',
							data: uniqueVisitorsData,
							borderColor: 'rgb(53, 162, 235)',
							backgroundColor: 'rgba(53, 162, 235, 0.5)',
						},
						{
							label: 'Visits',
							data: visitsData,
							borderColor: 'rgb(255, 99, 132)',
							backgroundColor: 'rgba(255, 99, 132, 0.5)',
						},
					],
				}}
				options={{
					responsive: true,
					color: 'currentColor',
					plugins: {
						legend: {
							position: 'top' as const,
							fullSize: true,
						},
						title: {
							display: true,
							text: 'Visits over time',
						},
					},
				}}
			/>
		</div>
	)
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
