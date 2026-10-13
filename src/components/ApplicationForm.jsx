import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function ApplicationForm({ jobId }) {
  const { addApplication } = useData()
  const [form, setForm] = useState({
    applicantName: '',
    applicantEmail: '',
    phone: '',
    coverLetter: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    addApplication({ jobId, ...form })
    setSubmitted(true)
  }

  const inputClass =
    'w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'

  if (submitted) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-lg font-semibold text-green-700">✅ Application sent!</p>
        <p className="mt-1 text-sm text-green-600">
          Thanks, {form.applicantName || 'applicant'}. The hiring manager can now see your
          application.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-slate-900">Apply for this role</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
          <input
            required
            className={inputClass}
            value={form.applicantName}
            onChange={update('applicantName')}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            required
            className={inputClass}
            value={form.applicantEmail}
            onChange={update('applicantEmail')}
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Phone number</label>
        <input
          type="tel"
          required
          className={inputClass}
          value={form.phone}
          onChange={update('phone')}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Cover letter</label>
        <textarea
          required
          rows={5}
          className={inputClass}
          value={form.coverLetter}
          onChange={update('coverLetter')}
          placeholder="Tell them why you're a great fit…"
        />
      </div>
      <button
        type="submit"
        className="self-start rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Submit application
      </button>
    </form>
  )
}
