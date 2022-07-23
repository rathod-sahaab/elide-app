import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { BiErrorCircle } from 'react-icons/bi'
import { MdOutlineChevronRight } from 'react-icons/md'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

import * as yup from 'yup'
import { FormPage } from './FormPage'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorInputWrapper } from '../../components/forms/ErrorInputWrapper'
import { ElideIcon } from '../../components/ElideIcon'

type Inputs = {
	email: string
	password: string
}

const schema = yup
	.object({
		email: yup.string().email('Please enter a valid Email').required('Email is required'),
		password: yup.string().required('Password is required'),
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

export const Login = () => {
	const [login, { isLoading }] = useLoginMutation()
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const {
		trigger,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({ resolver: yupResolver(schema) })

	const [error, setError] = useState<string | null>(null)
	const [passwordHidden, setPasswordHidden] = useState(true)

	const handleChange = () => {
		setError(null)
	}

	const submitHandler: SubmitHandler<Inputs> = async ({ email, password }) => {
		console.log({ email, password })
		try {
			const userdata = await login({ email, password }).unwrap()
			console.log(userdata)
			dispatch(setCredentials({ ...userdata }))
			navigate('/dashboard')
		} catch (err) {
			console.log(err)
			setError('Invalid email or password')
		}
	}

	return (
		<div>
			<div className="pb-6">
				<Link to="/" className="btn btn-ghost btn-circle text-accent">
					<ElideIcon />
				</Link>
			</div>
			<h1 className="text-2xl text-secondary-content font-bold">Welcome Back</h1>
			<h3 className="text-md text-base-content font-bold pt-2 pb-4">Sign in to continue</h3>
			<div className="[&>*:not(:last-child)]:mb-6 mt-10">
				{error && <Error message={error} />}
				<ErrorInputWrapper fieldError={errors.email}>
					<input
						className="input w-full bg-base-100 block"
						placeholder="Email"
						{...register('email', { required: true, disabled: isLoading })}
						onChange={() => {
							console.log('triggered')
							if (errors.email) {
								console.log('here')
								trigger('email')
							}
						}}
					/>
				</ErrorInputWrapper>
				<ErrorInputWrapper fieldError={errors.password}>
					<div className="relative">
						<input
							className="input w-full bg-base-100 block"
							type={passwordHidden ? 'password' : 'text'}
							placeholder="Password"
							{...register('password', { required: true, disabled: isLoading })}
							onChange={handleChange}
						/>

						<button
							className="btn btn-circle btn-ghost absolute right-1 top-0"
							onClick={() => setPasswordHidden(!passwordHidden)}
						>
							{passwordHidden ? <RiEyeLine size="1.5em" /> : <RiEyeOffLine size="1.5em" />}
						</button>
					</div>
				</ErrorInputWrapper>

				<button
					className="btn btn-block py-8 px-6 flex flex-nowrap items-center justify-between"
					disabled={isLoading}
					onClick={handleSubmit(submitHandler)}
				>
					<span>Login</span>
					<MdOutlineChevronRight size="1.8em" />
				</button>
			</div>
			<div className="flex justify-between font-bold text-sm mt-16">
				<Link to="/forgot-password">Forgot Password?</Link>
				<Link to="/register">Create Account</Link>
			</div>
		</div>
	)
}

export const LoginPage = () => (
	<FormPage>
		<Login />
	</FormPage>
)
