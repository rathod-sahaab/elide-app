import * as yup from 'yup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MdOutlineChevronRight } from 'react-icons/md'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { ErrorInputWrapper } from '../../../../components/forms/ErrorInputWrapper'
import { BiErrorCircle } from 'react-icons/bi'
import { FiCheckCircle } from 'react-icons/fi'
import { useChangePasswordMutation } from '../../userApiSlice'
import { FormPage } from '../../../auth/FormPage'
import { ElideIcon } from '../../../../components/ElideIcon'

const Error = ({ message }: { message: string }) => {
	return (
		<div className="alert alert-error shadow-lg">
			<div>
				<BiErrorCircle />
				<span>{message}</span>
			</div>
		</div>
	)
}

type Inputs = {
	oldPassword: string
	newPassword: string
	newPasswordConfirmation: string
}

const schema = yup.object({
	oldPassword: yup.string().required('Old password is required'),
	newPassword: yup.string().required(),
	newPasswordConfirmation: yup
		.string()
		.oneOf([yup.ref('newPassword'), null], 'Passwords must match')
		.required(),
})

export const ChangePasswordForm = () => {
	const navigate = useNavigate()

	const [changePassword, { isLoading, isSuccess }] = useChangePasswordMutation()
	const [error, setError] = useState<string>('')

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({ resolver: yupResolver(schema) })

	const [passwordHidden, setPasswordHidden] = useState(true)

	const submitHandler: SubmitHandler<Inputs> = async ({ oldPassword, newPassword }) => {
		try {
			await changePassword({ oldPassword, newPassword }).unwrap()
			setTimeout(() => {
				navigate('/dashboard')
			}, 3000)
		} catch (err) {
			console.log(err)
			setError('Error Reseting password')
		}
	}

	return isSuccess ? (
		<div className="flex flex-col items-center">
			<FiCheckCircle size="5em" className="mb-4 text-success" />
			<h1 className="text-2xl font-bold">Done! Redirecting you to the Dashboard.</h1>
		</div>
	) : (
		<div>
			<div className="pb-6">
				<span className="btn btn-ghost btn-circle text-primary">
					<ElideIcon />
				</span>
			</div>
			<h1 className="text-2xl font-bold">Reset Password</h1>
			<h3 className="text-md pt-2 font-bold text-base-content">Its only human to forget.</h3>
			<div className="mt-6 [&>*:not(:last-child)]:mb-2">
				{error && <Error message={error} />}
				<ErrorInputWrapper fieldError={errors.oldPassword}>
					<div className="relative">
						<input
							className="input block w-full bg-base-100"
							type={passwordHidden ? 'password' : 'text'}
							placeholder="Old Password"
							{...register('oldPassword', { disabled: isLoading })}
						/>

						<button
							className="btn btn-ghost btn-circle absolute right-1 top-0"
							onClick={() => setPasswordHidden(!passwordHidden)}
						>
							{passwordHidden ? <RiEyeLine size="1.5em" /> : <RiEyeOffLine size="1.5em" />}
						</button>
					</div>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.newPassword}>
					<div className="relative">
						<input
							className="input block w-full bg-base-100"
							type={passwordHidden ? 'password' : 'text'}
							placeholder="New Password"
							{...register('newPassword', { disabled: isLoading })}
						/>

						<button
							className="btn btn-ghost btn-circle absolute right-1 top-0"
							onClick={() => setPasswordHidden(!passwordHidden)}
						>
							{passwordHidden ? <RiEyeLine size="1.5em" /> : <RiEyeOffLine size="1.5em" />}
						</button>
					</div>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.newPasswordConfirmation}>
					<div className="relative">
						<input
							className="input block w-full bg-base-100"
							type={passwordHidden ? 'password' : 'text'}
							placeholder="Confirm New Password"
							{...register('newPasswordConfirmation', {
								required: true,
								disabled: isLoading,
							})}
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
					className="btn btn-block mt-6 flex flex-nowrap items-center justify-between py-8 px-6"
					disabled={isLoading}
					onClick={handleSubmit(submitHandler)}
				>
					<span>Reset password</span>
					<MdOutlineChevronRight size="1.8em" />
				</button>
			</div>
		</div>
	)
}

export const ChangePasswordPage = () => {
	return (
		<FormPage>
			<ChangePasswordForm />
		</FormPage>
	)
}
