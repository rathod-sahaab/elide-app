import { apiSlice } from '../../app/api/apiSlice'

export interface IOrganisationData {
	name: string
	description?: string
}

export interface IOrganisation extends IOrganisationData {
	id: number
}

export const organisationsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getOrganisations: builder.query({
			query: () => ({
				url: '/organisations',
			}),
		}),
		createOrganisation: builder.mutation({
			query: ({ name, description }: IOrganisationData) => ({
				url: '/organisations',
				method: 'POST',
				body: { name, description },
			}),
		}),
	}),
})

export const { useGetOrganisationsQuery, useCreateOrganisationMutation } = organisationsApiSlice
