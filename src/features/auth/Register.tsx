import { useState } from 'react'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { BiErrorCircle } from 'react-icons/bi'
import { MdOutlineChevronRight } from 'react-icons/md'

import * as yup from 'yup'
import { FormPage } from './FormPage'
import { Link } from 'react-router-dom'
import { ErrorInputWrapper } from '../../components/forms/ErrorInputWrapper'

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
	const [login, { isLoading }] = useLoginMutation()
	const dispatch = useDispatch()

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
		console.log({ email, password })
		try {
			// const userdata = await login({ email, password }).unwrap()
			// console.log(userdata)
			// dispatch(setCredentials({ ...userdata, email }))
			console.log({ name, email, password })
		} catch (err) {
			console.log(err)
			setError('Invalid email or password')
		}
	}

	return (
		<div>
			<h1 className="text-2xl text-secondary-content font-bold">Create Account</h1>
			<h3 className="text-md text-base-content font-bold pt-2 pb-4">Start your journey</h3>
			<div className="[&>*:not(:last-child)]:mb-6 mt-10">
				{error && <Error message={error} />}
				<ErrorInputWrapper fieldError={errors.name}>
					<input
						className="input w-full bg-base-100 block"
						placeholder="Your name"
						{...register('name', { required: true, disabled: isLoading })}
						onChange={handleChange}
					/>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.email}>
					<input
						className="input w-full bg-base-100 block"
						placeholder="Your email"
						{...register('email', { required: true, disabled: isLoading })}
						onChange={handleChange}
					/>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.password}>
					<input
						className="input w-full bg-base-100 block"
						type="password"
						placeholder="Password"
						{...register('password', { required: true, disabled: isLoading })}
						onChange={handleChange}
					/>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.passwordConfirmation}>
					<input
						className="input w-full bg-base-100 block"
						type="password"
						placeholder="Confirm Password"
						{...register('passwordConfirmation', { required: true, disabled: isLoading })}
						onChange={handleChange}
					/>
				</ErrorInputWrapper>
				<button
					className="btn btn-block py-8 px-6 flex flex-nowrap items-center justify-between"
					disabled={isLoading}
					onClick={handleSubmit(submitHandler)}
				>
					<span>Register</span>
					<MdOutlineChevronRight size="1.8em" />
				</button>
			</div>
			<div className="text-right font-bold text-sm mt-16">
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
