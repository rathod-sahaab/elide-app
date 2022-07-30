import { apiSlice } from '../../app/api/apiSlice'

export interface IOrganisationData {
	name: string
	description?: string
}

export const organisationsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getOrganisations: builder.query({
			query: () => ({
				url: '/organisations',
			}),
		}),
		createOrganisation: builder.mutation({
			query: (data: IOrganisationData) => ({
				url: '/organisations',
				method: 'POST',
				body: { data },
			}),
		}),
	}),
})

export const { useGetOrganisationsQuery, useCreateOrganisationMutation } = organisationsApiSlice
