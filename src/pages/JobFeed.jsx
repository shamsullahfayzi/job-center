import { useData } from '../context/DataContext'
import JobCard from '../components/JobCard'

export default function JobFeed() {
  const { jobs } = useData()

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Open positions</h1>
        <p className="text-sm text-slate-500">
          {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} available
        </p>
      </div>

      {jobs.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
          No jobs posted yet. Switch to “I am hiring” to post the first one.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </main>
  )
}
