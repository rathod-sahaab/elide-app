import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILink } from '../../features/links/linksSlice'
import { RootState } from '../store'

const initialState: {
	modals: {
		createLinkModal: boolean
		createOrganisationModal: boolean
		inviteMemberModal: boolean
		createProjectModal: boolean
	}
	updateLink: {
		updateLinkModal: boolean
		linkId: number | null
	}
	qr: {
		qrModal: boolean
		qrText: string
	}
	deleteLink: {
		deleteLinkModal: boolean
		link: ILink | null
	}
} = {
	modals: {
		createLinkModal: false,
		createOrganisationModal: false,
		inviteMemberModal: false,
		createProjectModal: false,
	},
	updateLink: {
		updateLinkModal: false,
		linkId: null,
	},
	qr: {
		qrModal: false,
		qrText: '',
	},
	deleteLink: {
		deleteLinkModal: false,
		link: null,
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
		openUpdateLinkModal: (state, action: PayloadAction<{ id: number | null }>) => {
			state.updateLink.updateLinkModal = true
			state.updateLink.linkId = action.payload.id
		},
		closeUpdateLinkModal: (state) => {
			state.updateLink.updateLinkModal = false
			state.updateLink.linkId = null
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
		openDeleteLinkModal: (state, action: PayloadAction<ILink>) => {
			state.deleteLink.deleteLinkModal = true
			state.deleteLink.link = action.payload
		},
		closeDeleteLinkModal: (state) => {
			state.deleteLink.deleteLinkModal = false
			state.deleteLink.link = null
		},
		openInviteMemberModal: (state) => {
			state.modals.inviteMemberModal = true
		},
		closeInviteMemberModal: (state) => {
			state.modals.inviteMemberModal = false
		},
		openQrModal: (state, action: PayloadAction<string>) => {
			state.qr.qrModal = true
			state.qr.qrText = action.payload
		},
		closeQrModal: (state) => {
			state.qr.qrModal = false
			state.qr.qrText = ''
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
	openQrModal,
	closeQrModal,
} = uiSlice.actions

export const uiSliceReducer = uiSlice.reducer

export const uiSelectCreateProject = (state: RootState) => state.ui.modals.createProjectModal

export const uiSelectCreateOrganisation = (state: RootState) =>
	state.ui.modals.createOrganisationModal

export const uiSelectUpdateLink = (state: RootState) => state.ui.updateLink

export const uiSelectQr = (state: RootState) => state.ui.qr

export const uiSelectDeleteLink = (state: RootState) => state.ui.deleteLink
