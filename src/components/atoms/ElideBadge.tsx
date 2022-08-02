export const ElideBadge = ({
	children,
	variant = 'success',
}: React.PropsWithChildren<{ variant: 'success' | 'error' | 'warning' }>) => {
	return (
		<span
			className={
				'btn btn-sm no-animation cursor-default opacity-70 ' +
				(variant === 'success'
					? // Bad cde but causes error without this, tailwind can't detect btn-success
					  'btn-success'
					: variant === 'warning'
					? 'btn-warning'
					: 'btn-error')
			}
		>
			{children}
		</span>
	)
}
