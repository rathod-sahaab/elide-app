import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const COLORS = [
	'#0A9396',
	'#94D2BD',
	'#BB3E03',
	'#AE2012',
	'#9B2226',
	'#E9D8A6',
	'#EE9B00',
	'#CA6702',
	'#001219',
	'#005F73',
] as const

export function DoughnutGraph({
	labels,
	data,
	title,
}: {
	title?: string
	labels: string[]
	data: number[]
}) {
	return (
		<div className="w-[300px] m-2">
			<Doughnut
				data={{
					labels,
					datasets: [
						{
							data,
							backgroundColor: COLORS,
							borderWidth: 0,
						},
					],
				}}
				options={{
					color: 'currentColor',
				}}
			/>
			{title && <h4 className="mt-2 text-center">{title}</h4>}
		</div>
	)
}
