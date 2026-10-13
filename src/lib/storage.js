// Single point of contact with localStorage. Every read is defensive:
// missing keys seed a sensible default and malformed JSON never throws.

const KEYS = {
  users: 'jobcenter_users',
  jobs: 'jobcenter_jobs',
  applications: 'jobcenter_applications',
  session: 'jobcenter_session',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getUsers = () => read(KEYS.users, [])
export const saveUsers = (users) => write(KEYS.users, users)

export const getJobs = () => read(KEYS.jobs, [])
export const saveJobs = (jobs) => write(KEYS.jobs, jobs)

export const getApplications = () => read(KEYS.applications, [])
export const saveApplications = (apps) => write(KEYS.applications, apps)

export const getSession = () => read(KEYS.session, null)
export const saveSession = (session) => write(KEYS.session, session)
export const clearSession = () => localStorage.removeItem(KEYS.session)

export const newId = () => crypto.randomUUID()
