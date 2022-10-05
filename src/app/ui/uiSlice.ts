import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILink } from '../../features/links/linksSlice'
import { IOrganisationInvitation } from '../../features/organisations/orgnisationsApiSlice'
import { RootState } from '../store'

const initialState: {
	createLink: {
		createLinkModal: boolean
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
	createOrganisation: {
		createOrganisationModal: boolean
	}
	createProject: {
		modal: boolean
	}
	inviteMember: {
		modal: boolean
	}
	cancelInvite: {
		modal: boolean
		invite: IOrganisationInvitation | null
	}
	logoutOfAllDevices: {
		modal: boolean
	}
} = {
	createLink: {
		createLinkModal: false,
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
	createOrganisation: {
		createOrganisationModal: false,
	},
	createProject: {
		modal: false,
	},
	inviteMember: {
		modal: false,
	},
	cancelInvite: {
		modal: false,
		invite: null,
	},
	logoutOfAllDevices: {
		modal: false,
	},
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openCreateLinkModal: (state) => {
			state.createLink.createLinkModal = true
		},
		closeCreateLinkModal: (state) => {
			state.createLink.createLinkModal = false
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
			state.createOrganisation.createOrganisationModal = true
		},
		closeCreateOrganisationModal: (state) => {
			state.createOrganisation.createOrganisationModal = false
		},
		openCreateProjectModal: (state) => {
			state.createProject.modal = true
		},
		closeCreateProjectModal: (state) => {
			state.createProject.modal = false
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
			state.inviteMember.modal = true
		},
		closeInviteMemberModal: (state) => {
			state.inviteMember.modal = false
		},
		openQrModal: (state, action: PayloadAction<string>) => {
			state.qr.qrModal = true
			state.qr.qrText = action.payload
		},
		closeQrModal: (state) => {
			state.qr.qrModal = false
			state.qr.qrText = ''
		},
		openLogoutOfAllDevicesModal: (state) => {
			state.logoutOfAllDevices.modal = true
		},
		closeLogoutOfAllDevicesModal: (state) => {
			state.logoutOfAllDevices.modal = false
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
	openLogoutOfAllDevicesModal,
	closeLogoutOfAllDevicesModal,
} = uiSlice.actions

export const uiSliceReducer = uiSlice.reducer

export const uiSelectCreateProject = (state: RootState) => state.ui.createProject

export const uiSelectCreateOrganisation = (state: RootState) => state.ui.createOrganisation

export const uiSelectCreateLink = (state: RootState) => state.ui.createLink
export const uiSelectUpdateLink = (state: RootState) => state.ui.updateLink

export const uiSelectQr = (state: RootState) => state.ui.qr

export const uiSelectDeleteLink = (state: RootState) => state.ui.deleteLink
export const uiSelectInviteMember = (state: RootState) => state.ui.inviteMember
export const uiSelectLogoutOfAllDevices = (state: RootState) => state.ui.logoutOfAllDevices
