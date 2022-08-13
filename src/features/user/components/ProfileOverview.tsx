import { useState } from 'react'
import { APIError } from '../../../commons/types'
import { IUserProfile, useGetProfileQuery, useSendVerificationLinkMutation } from '../userApiSlice'

export const ProfileOverview = () => {
	const { data, isLoading, refetch } = useGetProfileQuery({})
	const profile = data as IUserProfile

	const [error, setError] = useState('')

	const [sendVerificationLink, { isLoading: isSendVerificationLinkLoading }] =
		useSendVerificationLinkMutation()

	if (isLoading) {
		return <div>Loading...</div>
	}

	const handleSendVerificationLink = async () => {
		try {
			await sendVerificationLink({}).unwrap()
		} catch (err: any) {
			if (err.status) {
				const apiErr = err.data as APIError
				setError(apiErr.message)
			} else {
				console.log(err)
			}
		}
	}

	return (
		<div className="rounded-btn m-auto max-w-md bg-base-200 p-4 shadow-md [&>*:not(:last-child)]:mb-4">
			<h1 className="text-2xl">{profile.name}</h1>
			<h3>{profile.email}</h3>
			<div
				className={
					'alert rounded-btn flex items-center justify-between p-2 pl-4 ' +
					(profile.verified ? 'alert-success' : 'alert-warning')
				}
			>
				<span className="font-bold uppercase">
					{profile.verified ? 'Verified' : 'Not verified'}
				</span>
				{!profile.verified && (
					<button
						className="btn btn-primary btn-sm"
						onClick={() => handleSendVerificationLink()}
					>
						VERIFY
					</button>
				)}
			</div>
		</div>
	)
}
