import { FieldError } from 'react-hook-form'

export const ErrorInputWrapper = ({
	children,
	fieldError,
}: React.PropsWithChildren & { fieldError?: FieldError }) => {
	return (
		<div>
			{fieldError && <div className="pb-2 text-sm text-error">{fieldError.message}</div>}
			{children}
		</div>
	)
}
