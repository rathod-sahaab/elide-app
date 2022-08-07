import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: {
	modals: {
		createLinkModal: boolean
		deleteLinkModal: boolean
		createOrganisationModal: boolean
		inviteMemberModal: boolean
	}
} = {
	modals: {
		createLinkModal: false,
		deleteLinkModal: false,
		createOrganisationModal: false,
		inviteMemberModal: false,
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
} = uiSlice.actions

export const uiSliceReducer = uiSlice.reducer

export const uiSelectCreateOrganisation = (state: RootState) =>
	state.ui.modals.createOrganisationModal
