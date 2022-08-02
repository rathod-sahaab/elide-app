import { BiErrorCircle } from 'react-icons/bi'

export const ElideErrorCard = ({ children }: React.PropsWithChildren) => {
	return (
		<div className="alert alert-error flex items-center justify-between">
			<BiErrorCircle size="2em" />
			<div className="flex-1">{children}</div>
		</div>
	)
}
