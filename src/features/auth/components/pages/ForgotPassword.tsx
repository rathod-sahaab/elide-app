import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useForgotPasswordEmailMutation } from '../../authApiSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { BiErrorCircle } from 'react-icons/bi'
import { MdOutlineChevronRight } from 'react-icons/md'

import * as yup from 'yup'
import { FormPage } from '../../FormPage'
import { Link } from 'react-router-dom'
import { ErrorInputWrapper } from '../../../../components/forms/ErrorInputWrapper'
import { ElideIcon } from '../../../../components/ElideIcon'
import { FiCheckCircle } from 'react-icons/fi'

type Inputs = {
	email: string
}

const schema = yup
	.object({
		email: yup.string().email('Please enter a valid Email').required('Email is required'),
	})
	.required()

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

export const ForgotPassword = () => {
	const [sendResetPasswordLink, { isLoading, isSuccess }] = useForgotPasswordEmailMutation()

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({ resolver: yupResolver(schema) })

	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		setError(null)
	}, [watch])

	const submitHandler: SubmitHandler<Inputs> = async ({ email }) => {
		try {
			await sendResetPasswordLink({ email }).unwrap()
		} catch (err) {
			console.log(err)
			setError('Invalid email')
		}
	}

	return isSuccess ? (
		<div className="flex flex-col items-center">
			<FiCheckCircle size="3em" className="mb-4 text-success" />
			<h1 className="text-2xl font-bold">Reset link sent! You can close this page now.</h1>
		</div>
	) : (
		<div>
			<div className="pb-6">
				<Link to="/" className="btn btn-ghost btn-circle text-primary">
					<ElideIcon />
				</Link>
			</div>
			<h1 className="text-2xl font-bold">Forgot Password?</h1>
			<h3 className="text-md pt-2 pb-4 font-bold text-base-content">
				No worries! enter your registered email.
			</h3>
			<div className="mt-10 [&>*:not(:last-child)]:mb-6">
				{error && <Error message={error} />}
				<ErrorInputWrapper fieldError={errors.email}>
					<input
						className="input block w-full bg-base-100"
						placeholder="Email"
						{...register('email', { disabled: isLoading })}
					/>
				</ErrorInputWrapper>

				<button
					className="btn btn-block flex flex-nowrap items-center justify-between py-8 px-6"
					disabled={isLoading}
					onClick={handleSubmit(submitHandler)}
				>
					<span>Send reset password email</span>
					<MdOutlineChevronRight size="1.8em" />
				</button>
			</div>
		</div>
	)
}

export const ForgotPasswordPage = () => (
	<FormPage>
		<ForgotPassword />
	</FormPage>
)
