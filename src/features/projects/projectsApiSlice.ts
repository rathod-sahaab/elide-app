import { apiSlice } from '../../app/api/apiSlice'

export interface IProjectCreationData {
	name: string
	description?: string
}

export interface IProject {
	id: number
	name: string
	description?: string
}

export const projectsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjects: builder.query({
			query: ({
				offset,
				limit,
				organisationId,
			}: {
				offset: number
				limit: number
				organisationId?: number
			}) => ({
				url: organisationId ? `/organisations/${organisationId}/projects` : '/projects',
				params: {
					offset,
					limit,
				},
			}),
		}),
		createProject: builder.mutation({
			query: ({
				name,
				description,
				organisationId,
			}: {
				name: string
				description?: string
				organisationId?: number
			}) => ({
				url: '/projects',
				method: 'POST',
				body: { name, description, organisationId },
			}),
		}),
	}),
})

export const { useGetProjectsQuery, useCreateProjectMutation } = projectsApiSlice
