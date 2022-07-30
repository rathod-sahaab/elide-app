import { FieldError } from 'react-hook-form'

export const ErrorInputWrapper = ({
	children,
	fieldError,
	altComponent,
}: React.PropsWithChildren & { fieldError?: FieldError; altComponent?: JSX.Element }) => {
	return (
		<div className="form-control">
			<label className="label">
				<span className="label-text">
					{fieldError && <div className="text-error">{fieldError.message}</div>}
				</span>
				<span className="label-text-alt">{!!altComponent && altComponent}</span>
			</label>
			{children}
		</div>
	)
}
