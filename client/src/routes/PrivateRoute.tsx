import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { ReactNode } from 'react'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useUser()

  return user ? <>{children}</> : <Navigate to="/login" replace />
}

export default PrivateRoute
