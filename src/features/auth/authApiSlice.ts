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
	}),
})

export const { useLoginMutation, useRegisterMutation } = authApiSlice
