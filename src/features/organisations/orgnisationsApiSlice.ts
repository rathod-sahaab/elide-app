import { apiSlice } from '../../app/api/apiSlice'

export interface IOrganisationData {
	name: string
	description?: string
}

export interface IOrganisation extends IOrganisationData {
	id: number
}

export interface IOrganisationRole {
	role: string
	organisation: IOrganisation
}

export interface IUser {
	id: number
	name: string
	email: string
}

export interface IOrganisationInvitation {
	role: string
	status: string
	user: IUser
}

export interface IOrganisationMemberRole {
	role: string
	user: IUser
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
		getOrganisationMembers: builder.query({
			query: ({
				organisationId,
				offset,
				limit,
			}: {
				organisationId: number
				offset: number
				limit: number
			}) => ({
				url: `/organisations/${organisationId}/members`,
				method: 'GET',
				params: {
					offset,
					limit,
				},
			}),
		}),
		getOrganisationInvitations: builder.query({
			query: ({
				organisationId,
				offset,
				limit,
			}: {
				organisationId: number
				offset: number
				limit: number
			}) => ({
				url: `/organisations/${organisationId}/invitations`,
				method: 'GET',
				params: {
					offset,
					limit,
				},
			}),
		}),
	}),
})

export const {
	useGetOrganisationsQuery,
	useCreateOrganisationMutation,
	useGetOrganisationMembersQuery,
	useGetOrganisationInvitationsQuery,
} = organisationsApiSlice
