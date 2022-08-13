import { apiSlice } from '../../app/api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials: { email: string; password: string }) => ({
				url: '/auth/login',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		register: builder.mutation({
			query: ({ name, email, password }: { name: string; email: string; password: string }) => ({
				url: '/auth/register',
				method: 'POST',
				body: { name, email, password },
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'DELETE',
			}),
		}),
		verifyAccount: builder.mutation({
			query: ({ token }: { token: string }) => ({
				url: `/auth/verification`,
				method: 'POST',
				body: { token },
			}),
		}),
	}),
})

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useVerifyAccountMutation,
} = authApiSlice
