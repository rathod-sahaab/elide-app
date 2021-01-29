import User from '../models/data/User'

export const isBrowser = () => typeof window !== 'undefined'
export const getUser = () =>
   isBrowser() && window.localStorage.getItem('gatsbyUser')
      ? JSON.parse(window.localStorage.getItem('gatsbyUser'))
      : {}

const setUser = (user) =>
   window.localStorage.setItem('gatsbyUser', JSON.stringify(user))

export const handleLogin = async ({ username, password }): Promise<boolean> => {
   return fetch('/api/users/login', {
      method: 'POST', // or 'PUT'
      headers: {
         'Content-Type': 'application/json',
      },
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

export const logout = (callback) => {
   setUser({})
   callback()
}
