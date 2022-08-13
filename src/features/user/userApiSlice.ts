import { apiSlice } from '../../app/api/apiSlice'
import {
	InvitationStatusType,
	IOrganisation,
	RoleType,
} from '../organisations/orgnisationsApiSlice'

export interface IUserProfile {
	id: number
	name: string
	email: string
	verified: boolean
	createdAt: string
	updatedAt: string
}

export interface IUserInvitation {
	id: string
	role: RoleType
	status: InvitationStatusType
	organisation: IOrganisation
}

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProfile: builder.query({
			query: () => ({
				url: '/users/profile',
			}),
		}),
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
		acceptInvitation: builder.mutation({
			query: ({ id }: { id: string }) => ({
				url: `/users/invitations/${id}`,
				method: 'PUT',
			}),
		}),
		rejectInvitation: builder.mutation({
			query: ({ id }: { id: string }) => ({
				url: `/users/invitations/${id}`,
				method: 'DELETE',
			}),
		}),
		sendVerificationLink: builder.mutation({
			query: () => ({
				url: `/users/verification`,
				method: 'POST',
			}),
		}),
	}),
})

export const {
	useGetInvitationCountQuery,
	useGetInvitationsQuery,
	useAcceptInvitationMutation,
	useRejectInvitationMutation,
	useGetProfileQuery,
	useSendVerificationLinkMutation,
} = userApiSlice
