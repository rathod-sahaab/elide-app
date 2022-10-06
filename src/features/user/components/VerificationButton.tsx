import { useSendVerificationLinkMutation } from '../userApiSlice'

export const VerificationButton = () => {
	const [sendVerificationLink, { isLoading: isSendVerificationLinkLoading, isSuccess }] =
		useSendVerificationLinkMutation()

	const handleSendVerificationLink = async () => {
		try {
			await sendVerificationLink({}).unwrap()
		} catch (err: any) {
			console.log(err)
		}
	}

	return (
		<>
			{isSuccess ? (
				<span className="text-success">Verification link sent</span>
			) : (
				<button
					className={`btn btn-primary btn-sm ${isSendVerificationLinkLoading && 'loading'}`}
					onClick={() => handleSendVerificationLink()}
				>
					VERIFY
				</button>
			)}
		</>
	)
}
