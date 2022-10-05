import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { APIError } from '../../../commons/types'
import { useResetPasswordFromMailTokenMutation } from '../../../features/auth/authApiSlice'
import { ElideErrorCard } from '../../ElideAlert'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MdOutlineChevronRight } from 'react-icons/md'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { ErrorInputWrapper } from '../../forms/ErrorInputWrapper'
import { BiErrorCircle } from 'react-icons/bi'
import { ElideIcon } from '../../ElideIcon'
import { FormPage } from '../../../features/auth/FormPage'
import { FiCheckCircle } from 'react-icons/fi'

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
	password: string
	passwordConfirmation: string
}

const schema = yup.object({
	password: yup.string().required(),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required(),
})

export const ResetPassword = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const token = new URLSearchParams(location.search).get('token')

	const [resetPassword, { isLoading }] = useResetPasswordFromMailTokenMutation()
	const [error, setError] = useState<string>('')

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({ resolver: yupResolver(schema) })

	const [passwordHidden, setPasswordHidden] = useState(true)
	const [success, setSuccess] = useState(false)

	if (!token) {
		return <ElideErrorCard>Invalid Validation Link</ElideErrorCard>
	}

	const submitHandler: SubmitHandler<Inputs> = async ({ password }) => {
		try {
			await resetPassword({ password, token }).unwrap()
			setSuccess(true)
			setTimeout(() => {
				navigate('/login')
			}, 3000)
		} catch (err) {
			console.log(err)
			setError('Error Reseting password')
		}
	}

	return success ? (
		<div className="flex flex-col items-center">
			<FiCheckCircle size="5em" className="mb-4 text-success" />
			<h1 className="text-2xl font-bold">Done! Redirecting you to the Login page.</h1>
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
				<ErrorInputWrapper fieldError={errors.passwordConfirmation}>
					<div className="relative">
						<input
							className="input block w-full bg-base-100"
							type={passwordHidden ? 'password' : 'text'}
							placeholder="Confirm Password"
							{...register('passwordConfirmation', { required: true, disabled: isLoading })}
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

export const ResetPasswordPage = () => {
	return (
		<FormPage>
			<ResetPassword />
		</FormPage>
	)
}
