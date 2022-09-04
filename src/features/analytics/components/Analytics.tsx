import { useParams } from 'react-router-dom'

export const Analytics: React.FC = () => {
	const params = useParams()
	const { linkId } = params as { linkId: string }

	return <div className='text-center'>{linkId}</div>
}
