import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isLoggedIn, user, role, setRole, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (!isLoggedIn) return null

  // The role toggle both flips context state and navigates to the matching view.
  function switchTo(nextRole) {
    setRole(nextRole)
    navigate(nextRole === 'employer' ? '/employer' : '/')
  }

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  // Reflect the actual route so the toggle stays correct after refresh/back-nav.
  const activeRole = location.pathname.startsWith('/employer') ? 'employer' : role

  const tab = (active) =>
    `px-4 py-1.5 rounded-md text-sm font-medium transition ${
      active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
    }`

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <button
          onClick={() => switchTo('seeker')}
          className="text-lg font-bold tracking-tight text-indigo-600"
        >
          Job Center
        </button>

        <div className="flex items-center rounded-lg bg-slate-100 p-1">
          <button className={tab(activeRole === 'seeker')} onClick={() => switchTo('seeker')}>
            Looking for a job
          </button>
          <button className={tab(activeRole === 'employer')} onClick={() => switchTo('employer')}>
            I am hiring
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-slate-600 sm:inline">
            Hi, <span className="font-medium text-slate-900">{user?.username}</span>
          </span>
          <button
            onClick={handleLogout}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  )
}
