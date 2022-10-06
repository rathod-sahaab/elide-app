import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ErrorInputWrapper } from '../../../components/forms/ErrorInputWrapper'
import { useEffect, useState } from 'react'
import { APIError } from '../../../commons/types'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/use-app-dispacth-selector'
import { ElideModal } from '../../../components/ElideModal'
import { useLogoutOfAllDevicesMutation } from '../userApiSlice'
import { closeLogoutOfAllDevicesModal, uiSelectLogoutOfAllDevices } from '../../../app/ui/uiSlice'
import { logOut } from '../../auth/authSlice'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

const schema = yup.object({
	password: yup.string().required('Password is required'),
})

export const LogoutOfAllDevicesForm = ({ closeFn }: { closeFn?: () => void }) => {
	const [logoutOfAllDevices, { isLoading }] = useLogoutOfAllDevicesMutation()
	const [passwordHidden, setPasswordHidden] = useState(true)

	const [error, setError] = useState<string | null>(null)

	const open = useAppSelector(uiSelectLogoutOfAllDevices).modal
	const dispatch = useAppDispatch()

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ password: string }>({
		resolver: yupResolver(schema),
	})

	useEffect(() => {
		reset({
			password: '',
		})
		setError('')
	}, [open])

	const submitHandler: SubmitHandler<{ password: string }> = async (data) => {
		try {
			await logoutOfAllDevices({ password: data.password }).unwrap()
			if (closeFn) closeFn()
			dispatch(logOut())
		} catch (err: any) {
			if (err.status) {
				const apiError = err.data as APIError
				setError(apiError.message)
			} else {
				console.log(err)
			}
		}
	}

	return (
		<div className="[&>*]:mb-4">
			{error && <div className="alert alert-error">{error}</div>}
			<ErrorInputWrapper fieldError={errors.password}>
				<div className="relative">
					<input
						className="input block w-full bg-base-100"
						type={passwordHidden ? 'password' : 'text'}
						placeholder="Password"
						{...register('password', { disabled: isLoading })}
					/>

					<button
						className="btn btn-ghost btn-circle absolute right-1 top-0"
						onClick={() => setPasswordHidden(!passwordHidden)}
					>
						{passwordHidden ? <RiEyeLine size="1.5em" /> : <RiEyeOffLine size="1.5em" />}
					</button>
				</div>
			</ErrorInputWrapper>
			<button
				className="btn btn-outline btn-ghost btn-block mt-4 text-center"
				onClick={handleSubmit(submitHandler)}
			>
				{isLoading ? 'Logging out...' : 'Log out of all devices'}
			</button>
		</div>
	)
}

export const LogoutOfAllDevicesModal = () => {
	const open = useAppSelector(uiSelectLogoutOfAllDevices).modal
	const dispatch = useAppDispatch()

	return (
		<ElideModal
			open={open}
			closeFn={() => dispatch(closeLogoutOfAllDevicesModal())}
			title="Logout of all devices!"
		>
			<LogoutOfAllDevicesForm closeFn={() => dispatch(closeLogoutOfAllDevicesModal())} />
		</ElideModal>
	)
}
