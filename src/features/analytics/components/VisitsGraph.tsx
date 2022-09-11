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

export const VisitsGraph = ({
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

		return `${date.getHours() === 0 ? `${date.toLocaleDateString()} ` : ''}${timeAmPm}`
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
					normalized: true,
					scales: {
						y: {
							beginAtZero: true,
							min: 0,
							ticks: {
								stepSize: 1,
							},
						},
					},
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
