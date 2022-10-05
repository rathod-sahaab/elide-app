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
		forgotPasswordEmail: builder.mutation({
			query: ({ email }: { email: string }) => ({
				url: '/auth/forgot-password',
				method: 'POST',
				body: { email },
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'DELETE',
			}),
		}),
		resetPasswordFromMailToken: builder.mutation({
			query: ({ token, password }: { token: string; password: string }) => ({
				url: `/auth/reset-password`,
				method: 'POST',
				body: { token, password },
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
	useForgotPasswordEmailMutation,
	useVerifyAccountMutation,
	useResetPasswordFromMailTokenMutation,
} = authApiSlice
