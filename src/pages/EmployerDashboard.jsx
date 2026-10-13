import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import CreateJobForm from '../components/CreateJobForm'

export default function EmployerDashboard() {
  const { user } = useAuth()
  const { getJobsByUser, getApplicationsForUser, getJobById } = useData()

  const myJobs = getJobsByUser(user.id)
  const applicants = getApplicationsForUser(user.id)

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Hiring dashboard</h1>

      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <CreateJobForm />
      </section>

      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          Your job posts ({myJobs.length})
        </h2>
        {myJobs.length === 0 ? (
          <p className="text-sm text-slate-500">You haven't posted any jobs yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {myJobs.map((job) => (
              <li key={job.id} className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-slate-800">{job.title}</span>
                <span className="text-xs text-slate-500">{job.company}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          Applicants ({applicants.length})
        </h2>
        {applicants.length === 0 ? (
          <p className="text-sm text-slate-500">
            No applications yet. They'll show up here as candidates apply.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {applicants.map((app) => {
              const job = getJobById(app.jobId)
              return (
                <li key={app.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900">{app.applicantName}</p>
                    <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                      {job ? job.title : 'Unknown job'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {app.applicantEmail} · {app.phone}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{app.coverLetter}</p>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </main>
  )
}
