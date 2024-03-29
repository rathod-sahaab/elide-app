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
		logoutOfAllDevices: builder.mutation({
			query: ({ password }) => ({
				url: '/auth/sessions',
				method: 'DELETE',
				body: { password },
			}),
		}),
		changePassword: builder.mutation({
			query: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) => ({
				url: '/users/password',
				method: 'POST',
				body: { password: oldPassword, newPassword },
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
	useLogoutOfAllDevicesMutation,
	useChangePasswordMutation,
} = userApiSlice
