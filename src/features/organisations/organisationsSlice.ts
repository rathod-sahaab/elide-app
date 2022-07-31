import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { IOrganisation, IOrganisationRole } from './orgnisationsApiSlice'

const initialState: { organisation: IOrganisation | null; role: string | null } = {
	organisation: null,
	role: null,
}

const orgainsationSlice = createSlice({
	name: 'orgainsation',
	initialState,
	reducers: {
		setActiveOrganisation: (state, action: PayloadAction<IOrganisationRole>) => {
			state.organisation = action.payload.organisation
			state.role = action.payload.role
		},
		clearActiveOrganisation: (state) => {
			state.organisation = null
			state.role = null
		},
	},
})

export const { setActiveOrganisation, clearActiveOrganisation } = orgainsationSlice.actions

export const orgainsationSliceReducer = orgainsationSlice.reducer

export const selectOrganisation = (state: RootState) => state.organisation
