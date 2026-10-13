import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
  const { isLoggedIn, ready, login, register } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [error, setError] = useState('')

  if (ready && isLoggedIn) return <Navigate to="/" replace />

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (!form.username.trim()) return setError('Username is required.')
      if (form.password !== form.confirm) return setError('Passwords do not match.')
      const res = register({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      })
      if (!res.ok) return setError(res.error)
    } else {
      const res = login({ email: form.email.trim(), password: form.password })
      if (!res.ok) return setError(res.error)
    }
    navigate('/', { replace: true })
  }

  function switchMode(next) {
    setMode(next)
    setError('')
  }

  const inputClass =
    'w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12">
      <h1 className="mb-1 text-center text-2xl font-bold text-slate-900">Job Center</h1>
      <p className="mb-6 text-center text-sm text-slate-500">
        Find work or hire talent — all from one account.
      </p>

      <div className="mb-5 flex rounded-lg bg-slate-100 p-1">
        <button
          className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
            mode === 'login' ? 'bg-white shadow-sm' : 'text-slate-600'
          }`}
          onClick={() => switchMode('login')}
        >
          Log in
        </button>
        <button
          className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
            mode === 'register' ? 'bg-white shadow-sm' : 'text-slate-600'
          }`}
          onClick={() => switchMode('register')}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === 'register' && (
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Username</label>
            <input
              className={inputClass}
              value={form.username}
              onChange={update('username')}
              placeholder="jane_doe"
            />
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            required
            className={inputClass}
            value={form.email}
            onChange={update('email')}
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            required
            className={inputClass}
            value={form.password}
            onChange={update('password')}
            placeholder="••••••••"
          />
        </div>
        {mode === 'register' && (
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Confirm password
            </label>
            <input
              type="password"
              required
              className={inputClass}
              value={form.confirm}
              onChange={update('confirm')}
              placeholder="••••••••"
            />
          </div>
        )}

        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          {mode === 'login' ? 'Log in' : 'Create account'}
        </button>
      </form>
    </div>
  )
}
