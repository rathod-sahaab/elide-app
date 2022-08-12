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
		limit: 12,
		hasMore: false,
	},
	reducers: {
		setLinksLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload
		},
		setHasMore: (state, action: PayloadAction<boolean>) => {
			state.hasMore = action.payload
		},
		createLink: (state, action: PayloadAction<ILink>) => {
			// TODO: use cursor based pagination to avoid this
			if (state.links.length % state.limit === 0) {
				// when a "page" is completely loaded we have to remove the oldest link to maintain same page count
				state.links.pop()
				state.hasMore = true
			}
			// newly created link will be most recent so we add it to the front
			state.links = [action.payload, ...state.links]

			if (state.links.length % state.limit !== 0) {
				state.hasMore = false
			}
		},
		linksUpdateLink: (state, action: PayloadAction<ILink>) => {
			const linkIndex = state.links.findIndex((link) => link.id === action.payload.id)
			if (linkIndex !== -1) {
				state.links[linkIndex] = action.payload
			}
		},
		linksRemoveLinks: (state, action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload
			state.links = state.links.filter((link) => link.id !== id)
		},
		addLinks: (state, action: PayloadAction<ILink[]>) => {
			state.links.push(...action.payload)
			if (state.links.length % state.limit === 0) {
				// when a "page" is completely loaded we have to remove the oldest link to maintain same page count
				state.hasMore = true
			} else {
				state.hasMore = false
			}
		},
		setLinks: (state, action: PayloadAction<ILink[]>) => {
			state.links = action.payload
		},
		clearLinks: (state) => {
			state.links = []
		},
	},
})

export const {
	setLinksLimit,
	createLink,
	linksUpdateLink,
	linksRemoveLinks,
	addLinks,
	clearLinks,
	setLinks,
} = linksSlice.actions

export const linksSliceReducer = linksSlice.reducer

export const selectLinksLinks = (state: RootState) => state.links.links
export const selectLinks = (state: RootState) => state.links
