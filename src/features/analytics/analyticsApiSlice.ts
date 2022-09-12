import { apiSlice } from '../../app/api/apiSlice'

export const analyticsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAnalyticsForLinkTimeSeries: builder.query({
			query: ({
				linkId,
				startHrs,
				endHrs,
			}: {
				linkId: number
				startHrs?: number
				endHrs?: number
			}) => ({
				url: `/analytics/links/${linkId}/timeseries`,
				params: {
					startHrs,
					endHrs,
				},
			}),
		}),
		getAnalyticsForLinkOverview: builder.query({
			query: ({ linkId }: { linkId: number }) => ({
				url: `/analytics/links/${linkId}/overview`,
			}),
		}),
		getAnalyticsForLinkUserAgents: builder.query({
			query: ({
				linkId,
				startHrs,
				endHrs,
			}: {
				linkId: number
				startHrs?: number
				endHrs?: number
			}) => ({
				url: `/analytics/links/${linkId}/user-agents`,
				params: {
					startHrs,
					endHrs,
				},
			}),
		}),
		getAnalyticsForLinkRegion: builder.query({
			query: ({
				linkId,
				startHrs,
				endHrs,
			}: {
				linkId: number
				startHrs?: number
				endHrs?: number
			}) => ({
				url: `/api/links/${linkId}/analytics/region`,
				params: {
					startHrs,
					endHrs,
				},
			}),
		}),
	}),
})

export const {
	useGetAnalyticsForLinkTimeSeriesQuery,
	useGetAnalyticsForLinkUserAgentsQuery,
	useGetAnalyticsForLinkRegionQuery,
	useGetAnalyticsForLinkOverviewQuery,
} = analyticsApiSlice
