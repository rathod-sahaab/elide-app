import { apiSlice } from '../../app/api/apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getInvitationCount: builder.query({
			query: () => ({
				url: '/users/invitations/count',
			}),
		}),
	}),
})

export const { useGetInvitationCountQuery } = userApiSlice
