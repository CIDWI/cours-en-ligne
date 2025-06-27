// UserContext.tsx (entier avec loadingUser ajouté)

import { createContext, useContext, useEffect, useState } from "react"
import { User } from  "../types/user" 

interface UserContextType {
  user: User | null
  token: string | null
  loadingUser: boolean
  setUserFromLogin: (user: User, token: string) => void
  logout: () => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  loadingUser: true,
  setUserFromLogin: () => {},
  logout: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      const parsedUser: User = JSON.parse(storedUser)
      setToken(storedToken)
      fetch(`http://localhost:3000/user/${parsedUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.firstName && data.lastName) {
            setUser({ ...parsedUser, firstName: data.firstName, lastName: data.lastName })
          } else {
            setUser(parsedUser)
          }
        })
        .catch(() => setUser(parsedUser))
        .finally(() => setLoadingUser(false))
    } else {
      setLoadingUser(false)
    }
  }, [])

  const setUserFromLogin = (user: User, token: string) => {
    setUser(user)
    setToken(token)
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

    fetch(`http://localhost:3000/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.firstName && data.lastName) {
          setUser({ ...user, firstName: data.firstName, lastName: data.lastName })
        }
      })
      .catch(() => {})
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  return (
    <UserContext.Provider value={{ user, token, loadingUser, setUserFromLogin, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
