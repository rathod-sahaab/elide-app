import axios from 'axios'

// TODO: get from environment variable to add during build
const AUTH_API_BASE_URL = 'http://localhost:5000/api/auth'

const register = ({ email, password, name }: { email: string; password: string; name: string }) => {
	return axios.post(AUTH_API_BASE_URL + '/register', {
		email,
		password,
		name,
	})
}

const login = ({ email, password }: { email: string; password: string }) => {
	return axios.post(AUTH_API_BASE_URL + '/login', {
		email,
		password,
	})
}

export const AuthService = {
	register,
	login,
}
