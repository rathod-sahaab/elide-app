import UserRegistrationData from '../models/data/UserRegistrationData'

export const isBrowser = () => typeof window !== 'undefined'
export const getUser = () =>
   isBrowser() && window.localStorage.getItem('gatsbyUser')
      ? JSON.parse(window.localStorage.getItem('gatsbyUser'))
      : {}

const setUser = (user) =>
   window.localStorage.setItem('gatsbyUser', JSON.stringify(user))

export const handleRegister = async (
   values: UserRegistrationData
): Promise<boolean> => {
   return fetch(`${process.env.API_URL}/api/users/register`, {
      method: 'POST', // or 'PUT'
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(values),
   })
      .then(async (response) => {
         console.log(response)
         if (response.status == 200) {
            let user = await response.json()
            console.log(user)
            return true
         } else {
            return false
         }
      })
      .catch((error) => {
         console.error('Error:', error)
         return false
      })
}

export const handleLogin = async ({ username, password }): Promise<boolean> => {
   return fetch(`${process.env.API_URL}/api/users/login`, {
      method: 'POST', // or 'PUT'
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
   })
      .then(async (response) => {
         console.log(response)
         if (response.status == 200) {
            let user = await response.json()
            setUser(user)
            console.log(user)
            return true
         } else {
            return false
         }
      })
      .catch((error) => {
         console.error('Error:', error)
         return false
      })
}

export const isLoggedIn = () => {
   const user = getUser()
   return !!user.username
}

export const logout = async () => {
   setUser({})
   return await fetch(`${process.env.API_URL}/api/users/logout`, {
      method: 'GET',
      credentials: 'include',
   })
      .then(async (response) => {
         if (response.status === 200) {
            return true
         }
         return false
      })
      .catch((error) => {
         console.error('Error:', error)
         return false
      })
}
