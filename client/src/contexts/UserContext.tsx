import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { jwtDecode } from "jwt-decode"

// ----------------------
// Types
// ----------------------
interface User {
  id: number
  email: string
  role: string
}

interface UserContextType {
  user: User | null
  token: string | null
  logout: () => void
  setUserFromToken: (token: string) => void
}

// ----------------------
// Contexte
// ----------------------
const UserContext = createContext<UserContextType | undefined>(undefined)

// ----------------------
// Provider
// ----------------------
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const setUserFromToken = (token: string) => {
    try {
      const decoded = jwtDecode<User & { exp: number }>(token)
      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      })
      setToken(token)
      localStorage.setItem("token", token)
    } catch (error) {
      console.error("Token invalide :", error)
      localStorage.removeItem("token")
      setUser(null)
      setToken(null)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setUserFromToken(storedToken)
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, token, logout, setUserFromToken }}>
      {children}
    </UserContext.Provider>
  )
}

// ----------------------
// Hook personnalisé
// ----------------------
export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
