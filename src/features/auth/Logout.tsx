import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from './authApiSlice'
import { FiLogOut } from 'react-icons/fi'
import { useAppDispatch } from '../../app/hooks/use-app-dispacth-selector'
import { logOut } from './authSlice'

export const Logout = () => {
	const [logout, { isLoading }] = useLogoutMutation()
	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const handleClick = async () => {
		try {
			navigate('/', { replace: true })
			await logout({}).unwrap()
			dispatch(logOut())
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<button onClick={handleClick} className={isLoading ? 'btn-loading' : ''}>
			<FiLogOut /> Logout
		</button>
	)
}
