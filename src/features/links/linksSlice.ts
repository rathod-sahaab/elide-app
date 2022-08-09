import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

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
	initialState: {
		links: [] as ILink[],
	},
	reducers: {
		createLink: (state, action: PayloadAction<ILink>) => {
			// TODO: use cursor based pagination to avoid this
			state.links.pop()
			// newly created link will be most recent so we add it to the front
			state.links = [action.payload, ...state.links]
		},
		deleteLink: (state, action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload
			state.links = state.links.filter((link) => link.id !== id)
		},
		addLinks: (state, action: PayloadAction<ILink[]>) => {
			state.links.push(...action.payload)
		},
		setLinks: (state, action: PayloadAction<ILink[]>) => {
			state.links = action.payload
		},
		clearLinks: (state) => {
			state.links = []
		},
	},
})

export const { createLink, deleteLink, addLinks, clearLinks, setLinks } = linksSlice.actions

export const linksSliceReducer = linksSlice.reducer

export const selectLinks = (state: RootState) => state.links.links
