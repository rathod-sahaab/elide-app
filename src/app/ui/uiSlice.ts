import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: {
	modals: {
		createLinkModal: boolean
		deleteLinkModal: boolean
		createOrganisationModal: boolean
		inviteMemberModal: boolean
		createProjectModal: boolean
	}
} = {
	modals: {
		createLinkModal: false,
		deleteLinkModal: false,
		createOrganisationModal: false,
		inviteMemberModal: false,
		createProjectModal: true,
	},
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openCreateLinkModal: (state) => {
			state.modals.createLinkModal = true
		},
		closeCreateLinkModal: (state) => {
			state.modals.createLinkModal = false
		},
		openCreateOrganisationModal: (state) => {
			state.modals.createOrganisationModal = true
		},
		closeCreateOrganisationModal: (state) => {
			state.modals.createOrganisationModal = false
		},
		openCreateProjectModal: (state) => {
			state.modals.createProjectModal = true
		},
		closeCreateProjectModal: (state) => {
			state.modals.createProjectModal = false
		},
		openDeleteLinkModal: (state) => {
			state.modals.deleteLinkModal = true
		},
		closeDeleteLinkModal: (state) => {
			state.modals.deleteLinkModal = false
		},
		openInviteMemberModal: (state) => {
			state.modals.inviteMemberModal = true
		},
		closeInviteMemberModal: (state) => {
			state.modals.inviteMemberModal = false
		},
	},
})

export const {
	openCreateLinkModal,
	closeCreateLinkModal,
	openCreateOrganisationModal,
	closeCreateOrganisationModal,
	openInviteMemberModal,
	closeInviteMemberModal,
	openDeleteLinkModal,
	closeDeleteLinkModal,
	openCreateProjectModal,
	closeCreateProjectModal,
} = uiSlice.actions

export const uiSliceReducer = uiSlice.reducer

export const uiSelectCreateProject = (state: RootState) => state.ui.modals.createProjectModal

export const uiSelectCreateOrganisation = (state: RootState) =>
	state.ui.modals.createOrganisationModal
