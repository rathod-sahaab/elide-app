import { createSlice } from '@reduxjs/toolkit'

export interface ILink {
	id: number
	slug: string
	url: string
	description?: string
	active: boolean
}

const linksSlice = createSlice({
	name: 'links',
	initialState: <ILink[]>[
		{ id: 1, slug: 'google', url: 'https://www.google.com', active: true, description: 'hello' },
		{ id: 2, slug: 'abhay', url: 'https://abhay.rs', active: true, description: 'hello' },
	],
	reducers: {
		createLink: (state, action: { payload: { slug: string; url: string; active: boolean } }) => {
			const { slug, url } = action.payload
			state.push({ id: state.length + 1, slug, url, active: action.payload.active })
		},
		deleteLink: (state, action: { payload: { id: number } }) => {
			const { id } = action.payload
			state = state.filter((link) => link.id !== id)
		},
	},
})

export const { createLink, deleteLink } = linksSlice.actions

export const linksSliceReducer = linksSlice.reducer

export const selectLinks = (state: any): ILink[] => state.links
