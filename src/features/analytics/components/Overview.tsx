export const Overview = ({
	overviewData: { visits, uniqueVisitors },
}: {
	overviewData: {
		visits: number
		uniqueVisitors: number
	}
}) => {
	return (
		<div className="my-4 flex justify-center">
			<div className="stats bg-base-200 shadow">
				<div className="stat">
					<div className="stat-title">Total Visits</div>
					<div className="stat-value">{visits.toLocaleString()}</div>
				</div>
				<div className="stat">
					<div className="stat-title">Unique Visits</div>
					<div className="stat-value">{uniqueVisitors.toLocaleString()}</div>
				</div>
				<div className="stat">
					<div className="stat-title">Uniqueness of visitors</div>
					<div className="stat-value">{((uniqueVisitors * 100) / visits).toFixed(2)}%</div>
				</div>
			</div>
		</div>
	)
}
