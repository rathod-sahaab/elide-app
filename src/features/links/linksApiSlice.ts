import { apiSlice } from '../../app/api/apiSlice'
import { PaginationArgs } from '../../commons/types'
import { ILinkData } from './linksSlice'

export const linksApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createLink: builder.mutation({
			query: (data: ILinkData) => ({
				url: '/links',
				method: 'POST',
				body: { ...data },
			}),
		}),
		deleteLink: builder.mutation({
			query: ({ id }: { id: number }) => ({
				url: `/links/${id}`,
				method: 'DELETE',
			}),
		}),
		getLinks: builder.query({
			query: ({ offset, limit }: PaginationArgs) => ({
				url: '/links',
				method: 'GET',
				params: {
					offset,
					limit,
				},
			}),
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
