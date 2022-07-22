export const FormPage = ({ children }: React.PropsWithChildren) => {
	return (
		<section className="w-screen h-screen flex items-center justify-center">
			<div className="card bg-base-200 w-full max-w-sm shadow-lg p-6">{children}</div>
		</section>
	)
}
