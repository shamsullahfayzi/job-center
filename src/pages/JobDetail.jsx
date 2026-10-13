import { useParams, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import ApplicationForm from '../components/ApplicationForm'

export default function JobDetail() {
  const { id } = useParams()
  const { getJobById } = useData()
  const job = getJobById(id)

  if (!job) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-slate-600">This job no longer exists.</p>
        <Link to="/" className="mt-3 inline-block text-indigo-600 hover:underline">
          ← Back to jobs
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/" className="text-sm text-indigo-600 hover:underline">
        ← Back to jobs
      </Link>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
        <p className="mt-1 text-base font-medium text-indigo-600">{job.company}</p>
        {job.location && <p className="mt-1 text-sm text-slate-500">📍 {job.location}</p>}
        <div className="mt-5 whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {job.description}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <ApplicationForm jobId={job.id} />
      </div>
    </main>
  )
}
