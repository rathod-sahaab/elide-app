import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000',
	credentials: 'include',
})

const baseQueryWithReauth = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: {},
) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result?.error?.status === 401) {
		console.log('Getting new accessToken')
		// get new accessToken from authorization server
		const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
		console.log(refreshResult)
		if (refreshResult?.data) {
			const state: any = api.getState()
			const user = state.auth.user

			api.dispatch(setCredentials({ ...(refreshResult.data as any), user }))

			result = await baseQuery(args, api, extraOptions)
		} else {
			api.dispatch(logOut())
		}
	}

	return result
}

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({}),
})
