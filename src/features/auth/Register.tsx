import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRegisterMutation } from './authApiSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { BiErrorCircle } from 'react-icons/bi'
import { MdOutlineChevronRight } from 'react-icons/md'

import * as yup from 'yup'
import { FormPage } from './FormPage'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorInputWrapper } from '../../components/forms/ErrorInputWrapper'
import { ElideIcon } from '../../components/ElideIcon'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

type Inputs = {
	name: string
	email: string
	password: string
	passwordConfirmation: string
}

const schema = yup
	.object({
		name: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().required(),
		passwordConfirmation: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match')
			.required(),
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

export const Register = () => {
	const [registerApi, { isLoading }] = useRegisterMutation()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({ resolver: yupResolver(schema) })

	const [error, setError] = useState<string | null>(null)
	const [passwordHidden, setPasswordHidden] = useState(true)

	const handleChange = () => {
		setError(null)
	}

	const submitHandler: SubmitHandler<Inputs> = async ({ name, email, password }) => {
		console.log({ email, password, name })
		try {
			const userdata = await registerApi({ email, password, name }).unwrap()
			console.log(userdata)
			setTimeout(() => {
				navigate('/login')
			}, 3000)
		} catch (err) {
			console.log(err)
			setError('Error registering')
		}
	}

	return (
		<div>
			<div className="pb-6">
				<span className="btn btn-ghost btn-circle text-primary">
					<ElideIcon />
				</span>
			</div>
			<h1 className="text-2xl font-bold">Create Account</h1>
			<h3 className="text-md pt-2 font-bold text-base-content">Start your journey</h3>
			<div className="mt-6 [&>*:not(:last-child)]:mb-2">
				{error && <Error message={error} />}
				<ErrorInputWrapper fieldError={errors.name}>
					<input
						className="input block w-full bg-base-100"
						placeholder="Your name"
						{...register('name', { required: true, disabled: isLoading })}
						onChange={handleChange}
					/>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.email}>
					<input
						className="input block w-full bg-base-100"
						placeholder="Your email"
						{...register('email', { required: true, disabled: isLoading })}
						onChange={handleChange}
					/>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.password}>
					<div className="relative">
						<input
							className="input block w-full bg-base-100"
							type={passwordHidden ? 'password' : 'text'}
							placeholder="Password"
							{...register('password', { disabled: isLoading })}
							onChange={handleChange}
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
							onChange={handleChange}
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
					<span>Register</span>
					<MdOutlineChevronRight size="1.8em" />
				</button>
			</div>
			<div className="mt-16 text-right text-sm font-bold">
				<Link to="/login">Already a user? Sign in</Link>
			</div>
		</div>
	)
}

export const RegisterPage = () => (
	<FormPage>
		<Register />
	</FormPage>
)
