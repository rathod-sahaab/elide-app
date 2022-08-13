import { TbError404 } from 'react-icons/tb'
export const NotFound = () => {
	return (
		<div className="min-w-screen flex min-h-screen flex-col items-center justify-center">
			<h1 className="text-4xl font-bold">
				<TbError404 size="240px" />
			</h1>
			<p className="font-bold uppercase">Page not found</p>
		</div>
	)
}
