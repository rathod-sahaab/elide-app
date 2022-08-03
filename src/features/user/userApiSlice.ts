import { apiSlice } from '../../app/api/apiSlice'
import {
	InvitationStatusType,
	IOrganisation,
	RoleType,
} from '../organisations/orgnisationsApiSlice'

export interface IUserInvitation {
	id: string
	role: RoleType
	status: InvitationStatusType
	organisation: IOrganisation
}

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getInvitationCount: builder.query({
			query: () => ({
				url: '/users/invitations/count',
			}),
		}),
		getInvitations: builder.query({
			query: ({ offset, limit }) => ({
				url: '/users/invitations',
				params: {
					offset,
					limit,
				},
			}),
		}),
	}),
})

export const { useGetInvitationCountQuery, useGetInvitationsQuery } = userApiSlice
