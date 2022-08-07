import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { IProject } from './projectsApiSlice'

const initialState: { project: IProject | null } = {
	project: null,
}

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		setActiveProject: (state, action: PayloadAction<IProject>) => {
			state.project = action.payload
		},
		clearActiveProject: (state) => {
			state.project = null
		},
	},
})

export const { setActiveProject, clearActiveProject } = projectsSlice.actions

export const projectsSliceReducer = projectsSlice.reducer

export const selectActiveProject = (state: RootState) => state.projects
