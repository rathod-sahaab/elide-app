import { useEffect, useState } from 'react'
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
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({ resolver: yupResolver(schema) })

	const [error, setError] = useState<string | null>(null)
	const [passwordHidden, setPasswordHidden] = useState(true)

	useEffect(() => {
		setError(null)
	}, [watch])

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
				<Link to="/" className="btn btn-ghost btn-circle text-primary">
					<ElideIcon />
				</Link>
			</div>
			<h1 className="text-2xl font-bold">Welcome Back</h1>
			<h3 className="text-md pt-2 pb-4 font-bold text-base-content">Sign in to continue</h3>
			<div className="mt-10 [&>*:not(:last-child)]:mb-6">
				{error && <Error message={error} />}
				<ErrorInputWrapper fieldError={errors.email}>
					<input
						className="input block w-full bg-base-100"
						placeholder="Email"
						{...register('email', { disabled: isLoading })}
					/>
				</ErrorInputWrapper>
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
					className="btn btn-block flex flex-nowrap items-center justify-between py-8 px-6"
					disabled={isLoading}
					onClick={handleSubmit(submitHandler)}
				>
					<span>Login</span>
					<MdOutlineChevronRight size="1.8em" />
				</button>
			</div>
			<div className="mt-16 flex justify-between text-sm font-bold">
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
