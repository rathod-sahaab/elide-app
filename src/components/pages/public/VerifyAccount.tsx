import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { APIError } from '../../../commons/types'
import { useVerifyAccountMutation } from '../../../features/auth/authApiSlice'
import { ElideErrorCard } from '../../ElideAlert'
export const VerifyAccount = () => {
	const location = useLocation()
	const token = new URLSearchParams(location.search).get('token')

	const [verifyAccount, { isLoading }] = useVerifyAccountMutation()
	const [error, setError] = useState<string>('')

	const handleVerifyOnLoad = async () => {
		try {
			await verifyAccount({ token: token || '' }).unwrap()
		} catch (err: any) {
			if (err.status) {
				const apiErr = err.data as APIError
				setError(apiErr.message)
			} else {
				setError(JSON.stringify(err, null, 3))
			}
		}
	}

	useEffect(() => {
		handleVerifyOnLoad()
	}, [])

	if (!token) {
		return <ElideErrorCard>Invalid Validation Link</ElideErrorCard>
	}

	return (
		<div className="prose m-auto flex h-screen w-screen items-center justify-center">
			{error ? (
				<ElideErrorCard> {error} </ElideErrorCard>
			) : !isLoading ? (
				<h1>Account Verified Successfully, you can close this page.</h1>
			) : (
				<h1>Verifying your account...</h1>
			)}
		</div>
	)
}
