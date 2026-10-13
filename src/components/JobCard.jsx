import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
      <p className="mt-0.5 text-sm font-medium text-indigo-600">{job.company}</p>
      {job.location && (
        <p className="mt-1 text-xs text-slate-500">📍 {job.location}</p>
      )}
      <p className="mt-3 line-clamp-3 text-sm text-slate-600">{job.description}</p>
      <span className="mt-4 text-sm font-medium text-indigo-600">View & apply →</span>
    </Link>
  )
}
