import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Blocks access until the session has been rehydrated, then redirects
// unauthenticated users to the login page.
export default function ProtectedRoute({ children }) {
  const { isLoggedIn, ready } = useAuth()

  if (!ready) return null // avoid a flash of the login page during hydration
  if (!isLoggedIn) return <Navigate to="/login" replace />
  return children
}
