import { createSlice } from '@reduxjs/toolkit'

export interface ILink {
	id: number
	slug: string
	url: string
	description?: string
	active: boolean
}

export type ILinkData = Omit<ILink, 'id'>

const linksSlice = createSlice({
	name: 'links',
	initialState: <ILink[]>[
		{ id: 1, slug: 'google', url: 'https://www.google.com', active: true, description: 'hello' },
		{
			id: 2,
			slug: 'abhay',
			url: 'https://abhay.rs',
			active: false,
			description:
				'This is the link to my personal website made with gatsby deployed on github-pages.',
		},
	],
	reducers: {
		createLink: (state, action: { payload: ILinkData }) => {
			const { slug, url } = action.payload
			state.push({ id: state.length + 1, slug, url, active: action.payload.active })
		},
		deleteLink: (state, action: { payload: { id: number } }) => {
			const { id } = action.payload
			state = state.filter((link) => link.id !== id)
		},
		addLinks: (state: ILink[], action: { payload: ILink[] }) => {
			state.push(...action.payload)
		},
	},
})

export const { createLink, deleteLink } = linksSlice.actions

export const linksSliceReducer = linksSlice.reducer

export const selectLinks = (state: any): ILink[] => state.links
