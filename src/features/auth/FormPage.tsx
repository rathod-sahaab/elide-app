export const FormPage = ({ children }: React.PropsWithChildren) => {
	return (
		<section className="flex h-screen w-screen items-center justify-center">
			<div className="card w-full max-w-sm bg-base-200 p-6 shadow-lg">{children}</div>
		</section>
	)
}
