import { apiSlice } from '../../app/api/apiSlice'
import { PaginationArgs } from '../../commons/types'
import { ILinkData } from './linksSlice'

export const linksApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createLink: builder.mutation({
			query: ({
				organisationId,
				...data
			}: ILinkData & { organisationId?: undefined | number }) => {
				const fetchArgs = {
					url: '/links',
					method: 'POST',
					body: { ...data },
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
			}: PaginationArgs & { organisationId: undefined | number }) => {
				const fetchArgs = {
					url: '/links',
					method: 'GET',
					params: {
						offset,
						limit,
					},
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
				url: `/links/${slug}/availability`,
			}),
		}),
	}),
})

export const {
	useCreateLinkMutation,
	useDeleteLinkMutation,
	useGetLinksQuery,
	useLazyGetLinksQuery,
	useLazyGetSlugAvailabilityQuery,
} = linksApiSlice
