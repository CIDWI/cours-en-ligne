import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

interface User {
  id: number
  login: string
  role: string
}

interface UserContextType {
  user: User | null
  token: string | null
  logout: () => void
  setUserFromLogin: (user: User, token: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const setUserFromLogin = (user: User, token: string) => {
    setUser(user)
    setToken(token)
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setToken(null)
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, token, logout, setUserFromLogin }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
