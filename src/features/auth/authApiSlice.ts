import { apiSlice } from '../../app/api/apiSlice'

export const authrApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials: { email: string; password: string }) => ({
				url: '/auth/login',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
	}),
})

export const { useLoginMutation } = authrApiSlice
