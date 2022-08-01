import { useParams } from 'react-router-dom'

// TODO: use this
export interface OrganisationParams {
	organisationId: string
}

export const Organisation = () => {
	const params = useParams()
	if (!params.organisationId) {
		return <div>Invalid</div>
	}
	const organisationId = parseInt(params.organisationId, 10)

	return <div>{organisationId}</div>
}
