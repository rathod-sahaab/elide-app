import { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { IoKeySharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { APIError } from '../../../commons/types'
import { ElideErrorCard } from '../../../components/ElideAlert'
import { useRefreshAccessTokenQuery } from '../../auth/authApiSlice'
import { IUserProfile, useGetProfileQuery, useSendVerificationLinkMutation } from '../userApiSlice'
import { LogoutOfAllDevicesButton } from './LogoutOfAllDevicesButton'
import { VerificationButton } from './VerificationButton'

export const ProfileOverview = () => {
	const { data, isLoading } = useGetProfileQuery({})
	const profile = data as IUserProfile

	// TODO: only call conditionally when verified turns from false to true (redux state)
	const {} = useRefreshAccessTokenQuery({})

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className="rounded-btn m-auto max-w-screen-sm bg-base-200 p-4 shadow-md [&>*:not(:last-child)]:mb-4">
			<div className="prose max-w-full p-2">
				<h1 className="text-center">Profile</h1>
			</div>
			<div className="grid grid-cols-[1fr_1fr] [&>*]:p-2">
				<span>Name</span>
				<span>{profile.name}</span>
				<span>Email</span>
				<span>{profile.email}</span>
				<span>Verified</span>
				{profile.verified ? (
					<span className="text-success">Yes</span>
				) : (
					<span className="flex justify-between">
						<span className="text-error">No</span>
						<VerificationButton />
					</span>
				)}

				<span className="mt-6">
					<LogoutOfAllDevicesButton />
				</span>
				<span className="mt-6">
					<Link to="/change-password" className="btn btn-outline w-full font-normal">
						<IoKeySharp size="1.5em" className="mr-2" />
						Change Password
					</Link>
				</span>
			</div>
		</div>
	)
}
