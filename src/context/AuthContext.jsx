import { createContext, useContext, useReducer, useEffect } from 'react'
import {
  getUsers,
  saveUsers,
  getSession,
  saveSession,
  clearSession,
  newId,
} from '../lib/storage'

const AuthContext = createContext(null)

const initialState = {
  user: null, // the logged-in user object, or null
  isLoggedIn: false,
  role: 'seeker', // 'seeker' | 'employer'
  ready: false, // true once we've attempted to rehydrate the session
}

function reducer(state, action) {
  switch (action.type) {
    case 'REGISTER':
    case 'LOGIN':
      return { ...state, user: action.user, isLoggedIn: true, role: 'seeker' }
    case 'LOGOUT':
      return { ...initialState, ready: true }
    case 'SET_ROLE':
      return { ...state, role: action.role }
    case 'HYDRATE':
      return action.user
        ? { ...state, user: action.user, isLoggedIn: true, ready: true }
        : { ...state, ready: true }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Rehydrate the session from localStorage on first mount so a refresh
  // keeps the user logged in.
  useEffect(() => {
    const session = getSession()
    if (session?.isLoggedIn && session.userId) {
      const user = getUsers().find((u) => u.id === session.userId) || null
      dispatch({ type: 'HYDRATE', user })
    } else {
      dispatch({ type: 'HYDRATE', user: null })
    }
  }, [])

  function register({ username, email, password }) {
    const users = getUsers()
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with that email already exists.' }
    }
    const user = { id: newId(), username, email, password, jobsPosted: [] }
    saveUsers([...users, user])
    saveSession({ isLoggedIn: true, userId: user.id })
    dispatch({ type: 'REGISTER', user })
    return { ok: true }
  }

  function login({ email, password }) {
    const user = getUsers().find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )
    if (!user) return { ok: false, error: 'Invalid email or password.' }
    saveSession({ isLoggedIn: true, userId: user.id })
    dispatch({ type: 'LOGIN', user })
    return { ok: true }
  }

  function logout() {
    clearSession()
    dispatch({ type: 'LOGOUT' })
  }

  function setRole(role) {
    dispatch({ type: 'SET_ROLE', role })
  }

  const value = { ...state, register, login, logout, setRole }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
