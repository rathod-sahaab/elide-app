import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentToken, selectCurrentUser } from './authSlice'

export const Dashboard = () => {
	const user = useSelector(selectCurrentUser)
	const token = useSelector(selectCurrentToken)

	const welcome = user ? `Welcome ${user.name}` : 'Welcome'
	const tokenAbbr = token ? `${token.substring(0, 5)}...` : 'No token'

	return (
		<div>
			<h1>Dashboard</h1>
			<p>{welcome}</p>
			<p>Token: {tokenAbbr}</p>
			<p>
				<Link to="/profile">Go to profile</Link>
			</p>
		</div>
	)
}
