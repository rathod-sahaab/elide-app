import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: {
	modals: {
		createLinkModal: boolean
		deleteLinkModal: boolean
		createOrganisationModal: boolean
		inviteMemberModal: boolean
		createProjectModal: boolean
	}
	updateLink: {
		updateLinkModal: boolean
		linkId: number | null
	}
} = {
	modals: {
		createLinkModal: false,
		deleteLinkModal: false,
		createOrganisationModal: false,
		inviteMemberModal: false,
		createProjectModal: false,
	},
	updateLink: {
		updateLinkModal: false,
		linkId: null,
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
		openUpdateLinkModal: (state) => {
			state.updateLink.updateLinkModal = true
		},
		closeUpdateLinkModal: (state) => {
			state.updateLink.updateLinkModal = false
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
		setLinkId: (state, action: PayloadAction<{ id: number | null }>) => {
			state.updateLink.linkId = action.payload.id
		},
	},
})

export const {
	openCreateLinkModal,
	closeCreateLinkModal,
	openUpdateLinkModal,
	closeUpdateLinkModal,
	openCreateOrganisationModal,
	closeCreateOrganisationModal,
	openInviteMemberModal,
	closeInviteMemberModal,
	openDeleteLinkModal,
	closeDeleteLinkModal,
	openCreateProjectModal,
	closeCreateProjectModal,
	setLinkId,
} = uiSlice.actions

export const uiSliceReducer = uiSlice.reducer

export const uiSelectCreateProject = (state: RootState) => state.ui.modals.createProjectModal

export const uiSelectCreateOrganisation = (state: RootState) =>
	state.ui.modals.createOrganisationModal

export const uiSelectUpdateLink = (state: RootState) => state.ui.updateLink
