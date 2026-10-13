import { createContext, useContext, useState, useEffect } from 'react'
import {
  getJobs,
  saveJobs,
  getApplications,
  saveApplications,
  getUsers,
  saveUsers,
  newId,
} from '../lib/storage'

const DataContext = createContext(null)

// A couple of demo jobs so the feed isn't empty on a fresh install.
const SEED_JOBS = [
  {
    id: 'seed-1',
    title: 'Frontend Developer',
    company: 'Pixel & Co',
    description:
      'Build delightful React interfaces for our design tooling. You will own components end to end, from prototype to production, and collaborate closely with designers.',
    location: 'Remote',
    postedByUserId: 'seed',
  },
  {
    id: 'seed-2',
    title: 'Backend Engineer',
    company: 'DataForge',
    description:
      'Design and scale the APIs that power our analytics platform. Node, Postgres, and a healthy respect for tests. Comfortable owning a service from schema to deploy.',
    location: 'Berlin, DE',
    postedByUserId: 'seed',
  },
]

export function DataProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    const existing = getJobs()
    if (existing.length === 0) {
      saveJobs(SEED_JOBS)
      return SEED_JOBS
    }
    return existing
  })
  const [applications, setApplications] = useState(() => getApplications())

  // Keep localStorage in sync whenever our in-memory lists change.
  useEffect(() => {
    saveJobs(jobs)
  }, [jobs])

  useEffect(() => {
    saveApplications(applications)
  }, [applications])

  function addJob({ title, company, description, location }, postedByUserId) {
    const job = { id: newId(), title, company, description, location, postedByUserId }
    setJobs((prev) => [...prev, job])

    // Mirror the job id onto the user record for data-model completeness.
    const users = getUsers()
    const idx = users.findIndex((u) => u.id === postedByUserId)
    if (idx !== -1) {
      users[idx] = {
        ...users[idx],
        jobsPosted: [...(users[idx].jobsPosted || []), job.id],
      }
      saveUsers(users)
    }
    return job
  }

  function addApplication({ jobId, applicantName, applicantEmail, phone, coverLetter }) {
    const application = {
      id: newId(),
      jobId,
      applicantName,
      applicantEmail,
      phone,
      coverLetter,
    }
    setApplications((prev) => [...prev, application])
    return application
  }

  const getJobById = (id) => jobs.find((j) => j.id === id)
  const getJobsByUser = (userId) => jobs.filter((j) => j.postedByUserId === userId)
  const getApplicationsForUser = (userId) => {
    const myJobIds = new Set(jobs.filter((j) => j.postedByUserId === userId).map((j) => j.id))
    return applications.filter((a) => myJobIds.has(a.jobId))
  }

  const value = {
    jobs,
    applications,
    addJob,
    addApplication,
    getJobById,
    getJobsByUser,
    getApplicationsForUser,
  }
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
