import { apiSlice } from '../../app/api/apiSlice'
import { PaginationArgs } from '../../commons/types'
import { ILinkData } from './linksSlice'

export interface ILinkID {
	id: number
}

export interface ILinkUpdateData {
	url?: string
	description?: string
	active?: boolean
}

export const linksApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createLink: builder.mutation({
			query: ({
				organisationId,
				projectId,
				...data
			}: ILinkData & { organisationId?: undefined | number; projectId: undefined | number }) => {
				const fetchArgs = {
					url: '/links',
					method: 'POST',
					body: { ...data },
				}
				/* API only needs projectId if both projectId and organisationId are relevant */
				if (projectId) {
					return {
						...fetchArgs,
						body: {
							...data,
							projectId,
						},
					}
				}
				if (organisationId) {
					return {
						...fetchArgs,
						body: {
							...data,
							organisationId,
						},
					}
				}
				return fetchArgs
			},
		}),
		getLink: builder.query({
			query: ({ id }: ILinkID) => ({
				url: `/links/${id}`,
			}),
		}),
		updateLink: builder.mutation({
			query: ({ id, url, description, active }: ILinkUpdateData & ILinkID) => ({
				url: `/links/${id}`,
				method: 'PATCH',
				body: {
					url,
					description,
					active,
				},
			}),
		}),
		deleteLink: builder.mutation({
			query: ({ id }: { id: number }) => ({
				url: `/links/${id}`,
				method: 'DELETE',
			}),
		}),
		getLinks: builder.query({
			query: ({
				offset,
				limit,
				organisationId,
				projectId,
			}: PaginationArgs & {
				organisationId: undefined | number
				projectId: undefined | number
			}) => {
				const fetchArgs = {
					url: '/links',
					method: 'GET',
					params: {
						offset,
						limit,
					},
				}

				if (projectId) {
					return {
						...fetchArgs,
						url: `/projects/${projectId}/links`,
					}
				}

				if (organisationId) {
					return {
						...fetchArgs,
						url: `/organisations/${organisationId}/links`,
					}
				}
				return fetchArgs
			},
		}),
		getSlugAvailability: builder.query({
			query: ({ slug }: { slug: string }) => ({
				url: `/links/slug/${slug}/availability`,
			}),
		}),
	}),
})

export const {
	useCreateLinkMutation,
	useDeleteLinkMutation,
	useLazyGetLinkQuery,
	useGetLinksQuery,
	useLazyGetLinksQuery,
	useLazyGetSlugAvailabilityQuery,
	useUpdateLinkMutation,
} = linksApiSlice
