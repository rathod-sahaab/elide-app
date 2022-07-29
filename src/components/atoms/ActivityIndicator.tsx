export const ActivityIndicator = ({ active }: { active: boolean }) => {
	return (
		<div
			className={
				'tooltip tooltip-left flex cursor-pointer items-center capitalize ' +
				(active ? 'tooltip-success' : 'tooltip-warning')
			}
			data-tip={active ? 'active' : 'inactive'}
		>
			<span className={'badge ' + (active ? 'badge-success' : 'badge-warning')}></span>
		</div>
	)
}
