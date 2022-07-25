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
	initialState: <ILink[]>[],
	reducers: {
		createLink: (state: ILink[], action: { payload: ILink }) => {
			state.push(action.payload)
		},
		deleteLink: (state: ILink[], action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload
			state = state.filter((link) => link.id !== id)
		},
		addLinks: (state: ILink[], action: PayloadAction<ILink[]>) => {
			state.push(...action.payload)
		},
	},
})

export const { createLink, deleteLink, addLinks } = linksSlice.actions

export const linksSliceReducer = linksSlice.reducer

export const selectLinks = (state: RootState) => state.links
