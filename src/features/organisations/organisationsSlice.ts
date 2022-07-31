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
		setOrganisation: (
			state,
			action: PayloadAction<{ organisation: IOrganisation | null; role: string | null }>,
		) => {
			state.organisation = action.payload.organisation
			state.role = action.payload.role
		},
	},
})

export const { setOrganisation } = orgainsationSlice.actions

export const orgainsationSliceReducer = orgainsationSlice.reducer

export const selectOrganisation = (state: RootState) => state.organisation
