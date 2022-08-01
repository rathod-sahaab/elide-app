export const ElideBadge = ({
	children,
	variant: buttonType = 'success',
}: React.PropsWithChildren<{ variant: 'success' | 'error' | 'warning' }>) => {
	return (
		<span className={`btn cursor-default btn-${buttonType} btn-sm no-animation opacity-70`}>
			{children}
		</span>
	)
}
